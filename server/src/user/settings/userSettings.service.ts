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

  async updateSelectedMap(selectedMapId: string, user: User) {
    const { settings } = await this.userService.findById(user.id);
    const selectedMap = settings.maps.find((map) => map.id === selectedMapId) || null;
    const updatedUser = await this.updateUserSettings(user.id, { selectedMap });
    return updatedUser;
  }
}
