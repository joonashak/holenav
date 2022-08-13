import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Session } from "../auth/session/session.model";
import { SsoSession } from "../auth/sso/sso-session/sso-session.model";
import { Character } from "../entities/character/character.model";
import { Folder } from "../entities/folder/folder.model";
import { Signature } from "../entities/signature/signature.model";
import { System } from "../entities/system/system.model";
import { Credentials } from "../user/credentials/credentials.model";
import { User } from "../user/user.model";
import users from "./data/users";
import { MockFolderService } from "./mock-data-services/mock-folder.service";
import { MockUserService } from "./mock-data-services/mock-user.service";
import { MockWormholeService } from "./mock-data-services/mock-wormholes";

@Injectable()
export class DevToolsService {
  constructor(
    @InjectModel(Character.name) private characterModel: Model<Character>,
    @InjectModel(Folder.name) private folderModel: Model<Folder>,
    @InjectModel(Signature.name) private signatureModel: Model<Signature>,
    @InjectModel(SsoSession.name) private ssoSessionModel: Model<SsoSession>,
    @InjectModel(System.name) private systemModel: Model<System>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Credentials.name) private credentialsModel: Model<Credentials>,
    @InjectModel(Session.name) private sessionModel: Model<Session>,
    private mockUserService: MockUserService,
    private mockFolderService: MockFolderService,
    private mockWhService: MockWormholeService,
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
    await this.mockWhService.mock();
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
  }
}
