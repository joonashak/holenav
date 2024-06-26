import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";
import { HolenavCharacter } from "../entities/character/character.model";
import { CharacterService } from "../entities/character/character.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { SanitizedUserForManager } from "./dto/sanitized-user-for-manager.dto";
import { UserSsoTokens } from "./dto/user-sso-tokens.dto";
import { UserRoleService } from "./user-role.service";
import { HolenavUser, UserDocument } from "./user.model";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(HolenavUser.name) private userModel: Model<UserDocument>,
    private characterService: CharacterService,
    private userRoleService: UserRoleService,
  ) {}

  /**
   * Create new user.
   *
   * @param user User to be created.
   * @returns Newly created user.
   */
  async create(user: CreateUserDto): Promise<UserDocument> {
    await this.ensureCharacterNotInUse(user.main);
    await this.characterService.makeMain(user.main);

    const systemRole = await this.userRoleService.getNewUserSystemRole();
    const newUser = await this.userModel.create({
      ...user,
      systemRole,
    });

    return newUser;
  }

  /**
   * Get all users but do not include private or sensitive fields.
   *
   * Designed to be safe for use in frontend for listing users etc. Fields such
   * as settings and alts are removed.
   *
   * @returns List of users.
   */
  async findUsersSanitizedForManager(
    query?: FilterQuery<UserDocument>,
  ): Promise<SanitizedUserForManager[]> {
    return this.userModel
      .find(query)
      .populate(["main"])
      .select(["id", "main", "systemRole"]);
  }

  /**
   * Find a user by ID (Holenav's internal `User.id`).
   *
   * @param id User id to search for.
   * @returns The found user or `undefined`.
   */
  async findById(id: string): Promise<UserDocument> {
    const user = await this.userModel
      .findOne({ id })
      .populate([
        { path: "roles", strictPopulate: false },
        "main",
        "alts",
        "settings.activeFolder",
      ]);
    return user;
  }

  async findByCharacter(character: HolenavCharacter): Promise<HolenavUser> {
    return this.userModel
      .findOne({ $or: [{ main: character }, { alts: character }] })
      .exec();
  }

  async findByEsiId(esiId: string): Promise<HolenavUser> {
    const character = await this.characterService.findByEsiId(esiId);
    return this.findByCharacter(character);
  }

  /**
   * Find a user by character or create new.
   *
   * Both mains and alts are searched over. If a match is not found, new user is
   * create with the given character as its main.
   *
   * @param character Character to search for or use as the main if creating new
   *   user.
   * @returns The found or created user.
   */
  async findByCharacterOrCreateUser(
    character: HolenavCharacter,
  ): Promise<HolenavUser> {
    let user = await this.findByCharacter(character);

    if (!user) {
      user = await this.create({ main: character });
      user = await this.findById(user.id);
    }

    return user;
  }

  /** Add a new alt to a user. */
  async addAlt(alt: HolenavCharacter, userId: string): Promise<void> {
    await this.ensureCharacterNotInUse(alt);

    const user = await this.userModel.findOne({ id: userId });
    user.alts = user.alts.concat(alt);
    await user.save();
  }

  async removeAlt(esiId: string, userId: string): Promise<void> {
    const user = await this.findById(userId);
    user.alts = user.alts.filter((alt) => alt.esiId !== esiId);
    await user.save();

    this.characterService.remove(esiId);
  }

  /** Throws `HttpException` if given character is used anywhere. */
  private async ensureCharacterNotInUse(char: HolenavCharacter): Promise<void> {
    const mains = await this.userModel.find({ main: char });
    const alts = await this.userModel.find({ alts: char });

    if (mains.length || alts.length) {
      throw new HttpException(
        "Character already in use.",
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getSsoTokens(user: HolenavUser): Promise<UserSsoTokens> {
    const { main, alts } = await (
      await this.userModel
        .findOne({ id: user.id })
        .populate("main", ["ssoToken", "esiId"])
        .populate("alts", ["ssoToken", "esiId"])
    ).populate(["main.ssoToken", "alts.ssoToken"]);

    return {
      main: {
        esiId: main.esiId,
        accessToken: main.ssoToken?.accessToken || "",
      },
      alts: alts.map((alt) => ({
        esiId: alt.esiId,
        accessToken: alt.ssoToken?.accessToken || "",
      })),
    };
  }
}
