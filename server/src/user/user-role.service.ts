import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import SystemRole from "./roles/system-role.enum";
import { HolenavUser, UserDocument } from "./user.model";

@Injectable()
export class UserRoleService {
  constructor(
    @InjectModel(HolenavUser.name) private userModel: Model<UserDocument>,
  ) {}

  async assignSystemRole(
    userId: string,
    newRole: SystemRole,
  ): Promise<UserDocument> {
    await this.preventDemotingLastAdmin(userId);
    const user = await this.userModel.findOne({ id: userId });
    user.systemRole = newRole;
    return user.save();
  }

  /**
   * Role to be assigned for next new user.
   *
   * Currently just implements making the first user an admin.
   */
  async getNewUserSystemRole(): Promise<SystemRole> {
    const users = await this.userModel.find();
    return users.length === 0 ? SystemRole.ADMINISTRATOR : SystemRole.USER;
  }

  /** Ensures that at least one admin is always left after role updates. */
  private async preventDemotingLastAdmin(userId: string): Promise<void> {
    const currentAdmins = await this.userModel.find({
      systemRole: SystemRole.ADMINISTRATOR,
    });
    const adminsLeft = currentAdmins.filter((user) => user.id !== userId);

    if (adminsLeft.length === 0) {
      throw new Error("Demoting the last admin is not allowed.");
    }
  }
}
