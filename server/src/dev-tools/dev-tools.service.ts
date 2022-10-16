import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Session } from "../auth/session/session.model";
import { SsoSession } from "../auth/sso/sso-session/sso-session.model";
import { ConnectionGraphService } from "../connection-graph/connection-graph.service";
import { Character } from "../entities/character/character.model";
import { Folder } from "../entities/folder/folder.model";
import { SignatureOLD } from "../entities/signature/signature-OLD.model";
import { Credentials } from "../user/credentials/credentials.model";
import { User } from "../user/user.model";
import users from "./data/users";
import { MockConnectionGraphService } from "./mock-data-services/mock-connection-graph.service";
import { MockFolderService } from "./mock-data-services/mock-folder.service";
import { MockUserService } from "./mock-data-services/mock-user.service";
import { MockWormholeService } from "./mock-data-services/mock-wormholes.service";

@Injectable()
export class DevToolsService {
  constructor(
    @InjectModel(Character.name) private characterModel: Model<Character>,
    @InjectModel(Folder.name) private folderModel: Model<Folder>,
    @InjectModel(SignatureOLD.name) private signatureModel: Model<SignatureOLD>,
    @InjectModel(SsoSession.name) private ssoSessionModel: Model<SsoSession>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Credentials.name) private credentialsModel: Model<Credentials>,
    @InjectModel(Session.name) private sessionModel: Model<Session>,
    private mockUserService: MockUserService,
    private mockFolderService: MockFolderService,
    private mockWhService: MockWormholeService,
    private connectionGraphService: ConnectionGraphService,
    private mockConnectionGraphService: MockConnectionGraphService,
  ) {}

  /**
   * Clear collections and run data migrations.
   */
  async resetDatabase() {
    await this.clearCollections();

    await this.mockFolderService.mock();
    await this.mockUserService.mock();
  }

  /**
   * Clear database and seed it with mock data.
   */
  async seedDatabase() {
    await this.clearCollections();

    await this.mockFolderService.mock();
    await this.mockUserService.mock();
    await this.mockWhService.mock();
    await this.mockConnectionGraphService.mock();
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
    await this.userModel.deleteMany({});
    await this.credentialsModel.deleteMany({});
    await this.sessionModel.deleteMany({});
    await this.connectionGraphService.deleteAll();
  }
}
