import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { FolderService } from "../../entities/folder/folder.service";
import { User, UserDocument } from "../user.model";
import { UserService } from "../user.service";
import { UserSettings } from "./user-settings.model";

@Injectable()
export class UserSettingsService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private userService: UserService,
    private folderService: FolderService,
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

  async deleteSavedMap(mapId: string, user: User): Promise<User> {
    const { settings } = await this.userService.findById(user.id);
    const maps = settings.maps.filter((map) => map.id !== mapId);
    const selectedMap = settings.selectedMap.id === mapId ? null : settings.selectedMap;
    return this.updateUserSettings(user.id, { maps, selectedMap });
  }

  async changeActiveFolder(folderId: string, user: User): Promise<User> {
    // FIXME: Check for roles.
    const activeFolder = await this.folderService.getFolderById(folderId);
    return this.updateUserSettings(user.id, { activeFolder });
  }
}
