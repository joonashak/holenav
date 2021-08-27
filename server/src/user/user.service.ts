import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Character } from "../entities/character/character.model";
import { FolderService } from "../entities/folder/folder.service";
import { RoleService } from "../role/role.service";
import Roles from "../role/roles.enum";
import { CreateUserDto } from "./dto/createUser.dto";
import { User, UserDocument } from "./user.model";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private roleService: RoleService,
    private folderService: FolderService,
  ) {}

  /**
   * Create new user.
   * @param user User to be created.
   * @returns Newly created user.
   */
  async create(user: CreateUserDto): Promise<User> {
    const folder = await this.folderService.getDefaultFolder();
    const role = await this.roleService.create({ role: Roles.WRITE, folder });
    const newUser = await this.userModel.create({ ...user, roles: role });
    return newUser;
  }

  /**
   * Find a user by ID (Holenav's internal `User.id`).
   * @param id User id to search for.
   * @returns The found user or `undefined`.
   */
  async findById(id: string): Promise<User> {
    const user = await this.userModel.findOne({ id }).populate("roles");
    return user;
  }

  /**
   * Find a user by ID (Holenav's internal `User.id`), include *SECRET* tokens
   * in return value.
   * @param id User id to search for.
   * @returns The found user or `undefined`.
   */
  async findByIdWithTokens(id: string): Promise<User> {
    const user = await this.userModel.findOne({ id }).select("+tokens").populate("roles");
    return user;
  }

  /**
   * Find a user by (main) character.
   * @param character Character to search for.
   * @returns The found user or `undefined`.
   */
  async findByCharacter(character: Character): Promise<User> {
    const user = await this.userModel.findOne({ main: character });
    return user;
  }

  /**
   * Add a new token to a user's list of valid access tokens.
   * @param userId User to be edited.
   * @param newToken New token.
   */
  async addToken(userId: string, newToken: string): Promise<void> {
    await this.userModel.findOneAndUpdate({ id: userId }, { $push: { tokens: newToken } });
  }
}
