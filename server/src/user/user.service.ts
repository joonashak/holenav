import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Character } from "../entities/character/character.model";
import { CharacterService } from "../entities/character/character.service";
import { FolderService } from "../entities/folder/folder.service";
import { CreateUserDto } from "./dto/createUser.dto";
import { SanitizedUser } from "./dto/sanitizedUser.dto";
import { FolderRole } from "./roles/folderRole.model";
import FolderRoles from "./roles/folderRoles.enum";
import SystemRoles from "./roles/systemRoles.enum";
import { User, UserDocument } from "./user.model";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private folderService: FolderService,
    private characterService: CharacterService,
  ) {}

  /**
   * Create new user.
   * @param user User to be created.
   * @returns Newly created user.
   */
  async create(user: CreateUserDto): Promise<UserDocument> {
    if (user.main) {
      await this.ensureCharacterNotInUse(user.main);
    }

    const folder = await this.folderService.getDefaultFolder();
    const systemRole = await this.getNewUserSystemRole();
    const newUser = await this.userModel.create({
      ...user,
      folderRoles: [{ role: FolderRoles.WRITE, folder }],
      systemRole,
    });

    return newUser;
  }

  /**
   * Get all users but do not include private or sensitive fields.
   *
   * Designed to be safe for use in frontend for listing users etc. Fields such as
   * settings and alts are removed.
   * @returns List of users.
   */
  async findAllUsersSanitized(): Promise<SanitizedUser[]> {
    return this.userModel.find().populate(["main"]).select(["id", "main"]);
  }

  /**
   * Find a user by ID (Holenav's internal `User.id`).
   * @param id User id to search for.
   * @returns The found user or `undefined`.
   */
  async findById(id: string): Promise<UserDocument> {
    const user = await this.userModel.findOne({ id }).populate(["roles", "main", "alts"]);
    return user;
  }

  /**
   * Find a user by character or create new.
   *
   * Both mains and alts are searched over. If a match is not found, new user is
   * create with the given character as its main.
   * @param character Character to search for or use as the main if creating new user.
   * @returns The found or created user.
   */
  async findByCharacterOrCreateUser(character: Character): Promise<User> {
    let user = await this.userModel.findOne({ $or: [{ main: character }, { alts: character }] });

    if (!user) {
      user = await this.create({ main: character });
    }

    return user;
  }

  /**
   * Find a user by username and include password hash.
   *
   * For use in authentication only.
   * @param username Username to search for.
   * @returns User or null if not found.
   */
  async findWithCredentials(username: string): Promise<User> {
    return this.userModel.findOne({ "credentials.username": username }).select("+credentials");
  }

  /**
   * Add a new alt to a user.
   */
  async addAlt(alt: Character, userId: string): Promise<void> {
    this.ensureCharacterNotInUse(alt);

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

  /**
   * Throws `HttpException` if given character is used anywhere.
   */
  private async ensureCharacterNotInUse(char: Character): Promise<void> {
    const mains = await this.userModel.find({ main: char });
    const alts = await this.userModel.find({ alts: char });

    if (mains.length || alts.length) {
      throw new HttpException("Character already in use.", HttpStatus.BAD_REQUEST);
    }
  }

  private async getNewUserSystemRole(): Promise<SystemRoles> {
    const users = await this.userModel.find();
    return users.length === 0 ? SystemRoles.ADMINISTRATOR : SystemRoles.USER;
  }

  async addFolderRole(user: UserDocument, folderRole: FolderRole): Promise<void> {
    user.folderRoles = user.folderRoles.concat(folderRole);
    await user.save();
  }
}
