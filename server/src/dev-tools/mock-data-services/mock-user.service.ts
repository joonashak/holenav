import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { HolenavCharacter } from "../../entities/character/character.model";
import { FolderService } from "../../entities/folder/folder.service";
import { HolenavUser } from "../../user/user.model";
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
    for (const user of users) {
      const { id, main, systemRole } = user;

      const newChar = await this.characterModel.create({
        ...main,
        isMain: true,
      });

      await this.userModel.create({
        main: newChar,
        id,
        systemRole,
      });
    }
  }
}
