import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Character } from "../../entities/character/character.model";
import { FolderService } from "../../entities/folder/folder.service";
import { Credentials } from "../../user/credentials/credentials.model";
import defaultUserSettings from "../../user/settings/default-user-settings";
import { User, UserDocument } from "../../user/user.model";
import users from "../data/users";

@Injectable()
export class MockUserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Character.name) private characterModel: Model<Character>,
    @InjectModel(Credentials.name) private credentialsModel: Model<Credentials>,
    private folderService: FolderService,
  ) {}

  async mock() {
    const defaultFolder = await this.folderService.getDefaultFolder();

    for (const user of users) {
      const { id, main, defaultFolderRole, systemRole } = user;
      const newChar = await this.characterModel.create({ ...main, isMain: true });
      const credentials = await this.credentialsModel.create(user.credentials);
      const newUser = await this.userModel.create({
        main: newChar,
        id,
        systemRole,
        credentials,
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
