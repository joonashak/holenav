import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Character } from "../entities/character/character.model";
import { FolderService } from "../entities/folder/folder.service";
import { RoleService } from "../role/role.service";
import { User } from "../user/user.model";
import users from "./data/users";

@Injectable()
export class MockUserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Character.name) private characterModel: Model<Character>,
    private folderService: FolderService,
    private roleService: RoleService,
  ) {}

  async mock() {
    const folder = await this.folderService.getDefaultFolder();

    for (const user of users) {
      const { id, main, role } = user;
      const newChar = await this.characterModel.create(main);
      const roles = [await this.roleService.create({ role, folder })];
      await this.userModel.create({ main: newChar, id, roles, activeFolder: folder });
    }
  }
}
