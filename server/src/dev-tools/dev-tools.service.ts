import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AppData } from "../app-data/app-data.model";
import { AppDataService } from "../app-data/app-data.service";
import { Session } from "../auth/session/session.model";
import { SsoSession } from "../auth/sso/sso-session/sso-session.model";
import { ConnectionGraphService } from "../connection-graph/connection-graph.service";
import { HolenavCharacter } from "../entities/character/character.model";
import { Folder } from "../entities/folder/folder.model";
import { HolenavUser } from "../user/user.model";
import users from "./data/users";
import { MockConnectionGraphService } from "./mock-data-services/mock-connection-graph.service";
import { MockFolderService } from "./mock-data-services/mock-folder.service";
import { MockUserService } from "./mock-data-services/mock-user.service";

@Injectable()
export class DevToolsService {
  constructor(
    @InjectModel(HolenavCharacter.name)
    private characterModel: Model<HolenavCharacter>,
    @InjectModel(Folder.name) private folderModel: Model<Folder>,
    @InjectModel(SsoSession.name) private ssoSessionModel: Model<SsoSession>,
    @InjectModel(HolenavUser.name) private userModel: Model<HolenavUser>,
    @InjectModel(Session.name) private sessionModel: Model<Session>,
    @InjectModel(AppData.name) private appDataModel: Model<AppData>,
    private appDataService: AppDataService,
    private mockUserService: MockUserService,
    private mockFolderService: MockFolderService,
    private connectionGraphService: ConnectionGraphService,
    private mockConnectionGraphService: MockConnectionGraphService,
  ) {}

  /** Clear collections and run data migrations. */
  async resetDatabase() {
    await this.clearCollections();

    await this.mockFolderService.mock();
    await this.mockUserService.mock();
  }

  /** Clear database and seed it with mock data. */
  async seedDatabase() {
    await this.clearCollections();

    await this.appDataService.initialize();
    await this.mockFolderService.mock();
    await this.mockUserService.mock();
    await this.mockConnectionGraphService.mock();
  }

  async getMockUsers() {
    // Do not read these from db to avoid potentially leaking actual user data!
    return users.map(({ id, main: { name } }) => ({ id, name }));
  }

  private async clearCollections() {
    await this.characterModel.deleteMany({});
    await this.folderModel.deleteMany({});
    await this.ssoSessionModel.deleteMany({});
    await this.userModel.deleteMany({});
    await this.sessionModel.deleteMany({});
    await this.appDataModel.deleteMany({});
    await this.connectionGraphService.deleteAll();
  }
}
