import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Character } from "../entities/character/character.model";
import { RoleService } from "../role/role.service";
import Roles from "../role/roles.enum";
import { CreateUserDto } from "./dto/createUser.dto";
import { User, UserDocument } from "./user.model";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private roleService: RoleService,
  ) {}

  /**
   * Create new user.
   * @param user User to be created.
   * @returns Newly created user.
   */
  async create(user: CreateUserDto): Promise<User> {
    const role = await this.roleService.create(Roles.READ);
    const newUser = await this.userModel.create({ ...user, roles: role });
    return newUser;
  }

  async findById(id: string): Promise<User> {
    const user = await this.userModel.findOne({ id });
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
