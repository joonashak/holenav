import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { SsoState } from "../auth/sso/ssoState/ssoState.model";
import { DataMigration } from "../dataMigration/dataMigration.model";
import { DataMigrationService } from "../dataMigration/dataMigration.service";
import { Character } from "../entities/character/character.model";
import { Folder } from "../entities/folder/folder.model";
import { Signature } from "../entities/signature/signature.model";
import { System } from "../entities/system/system.model";
import { Role } from "../role/role.model";
import { User } from "../user/user.model";

@Injectable()
export class DevToolsService {
  constructor(
    @InjectModel(Character.name) private characterModel: Model<Character>,
    @InjectModel(DataMigration.name) private dataMigrationModel: Model<DataMigration>,
    @InjectModel(Folder.name) private folderModel: Model<Folder>,
    @InjectModel(Role.name) private roleModel: Model<Role>,
    @InjectModel(Signature.name) private signatureModel: Model<Signature>,
    @InjectModel(SsoState.name) private ssoStateModel: Model<SsoState>,
    @InjectModel(System.name) private systemModel: Model<System>,
    @InjectModel(User.name) private userModel: Model<User>,
    private dataMigrationService: DataMigrationService,
  ) {}

  /**
   * Clear collections and run data migrations.
   */
  async resetDatabase() {
    await this.clearCollections();
  }

  private async clearCollections() {
    await this.characterModel.deleteMany({});
    await this.folderModel.deleteMany({});
    await this.roleModel.deleteMany({});
    await this.signatureModel.deleteMany({});
    await this.ssoStateModel.deleteMany({});
    await this.systemModel.deleteMany({});
    await this.userModel.deleteMany({});

    // Capped collection must be updated instead of cleared.
    await this.dataMigrationModel.create({ version: 0 });

    await this.dataMigrationService.migrate();
  }
}
