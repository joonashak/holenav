import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Session } from "../auth/session/session.model";
import { SsoSession } from "../auth/sso/ssoSession/ssoSession.model";
import { DataMigration } from "../dataMigration/dataMigration.model";
import { DataMigrationService } from "../dataMigration/dataMigration.service";
import { Character } from "../entities/character/character.model";
import { Folder } from "../entities/folder/folder.model";
import { FolderService } from "../entities/folder/folder.service";
import { Signature } from "../entities/signature/signature.model";
import { System } from "../entities/system/system.model";
import { Wormhole } from "../entities/wormhole/wormhole.model";
import { WormholeService } from "../entities/wormhole/wormhole.service";
import { Credentials } from "../user/credentials/credentials.model";
import { User } from "../user/user.model";
import users from "./data/users";
import { MockFolderService } from "./mockDataServices/mockFolder.service";
import { MockUserService } from "./mockDataServices/mockUser.service";
import mockWormholes from "./mockDataServices/mockWormholes";

@Injectable()
export class DevToolsService {
  constructor(
    @InjectModel(Character.name) private characterModel: Model<Character>,
    @InjectModel(DataMigration.name) private dataMigrationModel: Model<DataMigration>,
    @InjectModel(Folder.name) private folderModel: Model<Folder>,
    @InjectModel(Signature.name) private signatureModel: Model<Signature>,
    @InjectModel(SsoSession.name) private ssoSessionModel: Model<SsoSession>,
    @InjectModel(System.name) private systemModel: Model<System>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Wormhole.name) private whModel: Model<Wormhole>,
    @InjectModel(Credentials.name) private credentialsModel: Model<Credentials>,
    @InjectModel(Session.name) private sessionModel: Model<Session>,
    private dataMigrationService: DataMigrationService,
    private mockUserService: MockUserService,
    private mockFolderService: MockFolderService,
    private folderService: FolderService,
    private whService: WormholeService,
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

    await this.mockFolderService.mock();
    await this.mockUserService.mock();
    await mockWormholes(this.whModel, this.whService, this.folderService);
  }

  async getMockUsers() {
    // Do not read these from db to avoid potentially leaking actual user data!
    return users.map(({ id, main: { name } }) => ({ id, name }));
  }

  private async clearCollections() {
    await this.characterModel.deleteMany({});
    await this.folderModel.deleteMany({});
    await this.signatureModel.deleteMany({});
    await this.ssoSessionModel.deleteMany({});
    await this.systemModel.deleteMany({});
    await this.userModel.deleteMany({});
    await this.credentialsModel.deleteMany({});
    await this.sessionModel.deleteMany({});

    // Capped collection must be updated instead of cleared.
    await this.dataMigrationModel.create({ version: 0 });

    await this.dataMigrationService.migrate();
  }
}
