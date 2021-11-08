import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "../user.model";
import { UserService } from "../user.service";
import { UserSettings } from "./userSettings.model";

@Injectable()
export class UserSettingsService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private userService: UserService,
  ) {}

  /**
   * Update user settings. Use this to ensure deep updates.
   * @param userId Id of user to be updated.
   * @param update Partial settings object containing fields to be updated.
   * @returns Updated user object.
   */
  private async updateUserSettings(userId: string, update: Partial<UserSettings>): Promise<User> {
    const user = await this.userModel.findOne({ id: userId });
    const { id, settings } = user.toObject();
    const updatedSettings = { ...settings, ...update };

    const updatedUser = await this.userModel.findOneAndUpdate(
      { id },
      { settings: updatedSettings },
      { new: true },
    );
    return updatedUser;
  }

  async updateSelectedMap(selectedMapId: string, user: User): Promise<User> {
    const { settings } = await this.userService.findById(user.id);
    const selectedMap = settings.maps.find((map) => map.id === selectedMapId) || null;
    return this.updateUserSettings(user.id, { selectedMap });
  }

  async createSavedMap(name: string, rootSystemName: string, user: User): Promise<User> {
    const { settings } = await this.userService.findById(user.id);
    const maps = settings.maps.concat({ name, rootSystemName });
    return this.updateUserSettings(user.id, { maps });
  }
}
