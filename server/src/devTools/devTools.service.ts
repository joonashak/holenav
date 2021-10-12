import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { SsoState } from "../auth/sso/ssoState/ssoState.model";
import { DataMigration } from "../dataMigration/dataMigration.model";
import { DataMigrationService } from "../dataMigration/dataMigration.service";
import { Character } from "../entities/character/character.model";
import { Folder } from "../entities/folder/folder.model";
import { FolderService } from "../entities/folder/folder.service";
import { Signature } from "../entities/signature/signature.model";
import { System } from "../entities/system/system.model";
import { Wormhole } from "../entities/wormhole/wormhole.model";
import { Role } from "../role/role.model";
import { User } from "../user/user.model";
import users from "./data/users";
import { MockUserService } from "./mockUser.service";
import mockWormholes from "./mockWormholes";

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
    @InjectModel(Wormhole.name) private whModel: Model<Wormhole>,
    private dataMigrationService: DataMigrationService,
    private mockUserService: MockUserService,
    private folderService: FolderService,
  ) {}

  /**
   * Clear collections and run data migrations.
   */
  async resetDatabase() {
    await this.clearCollections();
  }

  /**
   * Clear database and seed it with mock data.
   */
  async seedDatabase() {
    await this.clearCollections();

    await this.mockUserService.mock();
    await mockWormholes(this.whModel, this.folderService);
  }

  async getMockUsers() {
    // Do not read these from db to avoid potentially leaking actual user data!
    return users.map(({ id, role, main: { name } }) => ({ id, role, name }));
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