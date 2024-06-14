import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { HolenavCharacter } from "../../entities/character/character.model";
import { FolderService } from "../../entities/folder/folder.service";
import defaultUserSettings from "../../user/settings/default-user-settings";
import { HolenavUser, UserDocument } from "../../user/user.model";
import users from "../data/users";

@Injectable()
export class MockUserService {
  constructor(
    @InjectModel(HolenavUser.name) private userModel: Model<HolenavUser>,
    @InjectModel(HolenavCharacter.name)
    private characterModel: Model<HolenavCharacter>,
    private folderService: FolderService,
  ) {}

  async mock() {
    const defaultFolder = await this.folderService.getDefaultFolder();

    for (const user of users) {
      const { id, main, defaultFolderRole, systemRole } = user;
      const newChar = await this.characterModel.create({
        ...main,
        isMain: true,
      });
      const newUser = await this.userModel.create({
        main: newChar,
        id,
        systemRole,
        folderRoles: [{ role: defaultFolderRole, folder: defaultFolder }],
        settings: { ...defaultUserSettings, activeFolder: defaultFolder },
      });
      await this.preSelectMap(newUser);
    }
  }

  private async preSelectMap(user: UserDocument) {
    user.settings.selectedMap = user.settings.maps[0];
    await user.save();
  }
}
