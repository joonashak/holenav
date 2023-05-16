import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import SystemRole from "./roles/system-role.enum";
import { User, UserDocument } from "./user.model";

@Injectable()
export class UserRoleService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  /**
   * Role to be assigned for next new user.
   *
   * Currently just implements making the first user an admin.
   */
  async getNewUserSystemRole(): Promise<SystemRole> {
    const users = await this.userModel.find();
    return users.length === 0 ? SystemRole.ADMINISTRATOR : SystemRole.USER;
  }
}
