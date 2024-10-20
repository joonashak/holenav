import { Injectable } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection } from "mongoose";
import { AppDataService } from "../app-data/app-data.service";
import { HolenavCharacter } from "../entities/character/character.model";
import users from "./data/users";
import { MockConnectionGraphService } from "./mock-data-services/mock-connection-graph.service";
import { MockFolderService } from "./mock-data-services/mock-folder.service";
import { MockUserService } from "./mock-data-services/mock-user.service";

@Injectable()
export class DevToolsService {
  constructor(
    @InjectConnection() private dbConnection: Connection,
    @InjectModel(HolenavCharacter.name)
    private appDataService: AppDataService,
    private mockUserService: MockUserService,
    private mockFolderService: MockFolderService,
    private mockConnectionGraphService: MockConnectionGraphService,
  ) {}

  /** Clear entire database. */
  async resetDatabase() {
    await this.dropAllCollections();
  }

  /** Clear database and seed it with mock data. */
  async seedDatabase() {
    await this.dropAllCollections();

    await this.appDataService.initialize();
    await this.mockFolderService.mock();
    await this.mockUserService.mock();
    await this.mockConnectionGraphService.mock();
  }

  async getMockUsers() {
    // Do not read these from db to avoid potentially leaking actual user data!
    return users.map(({ id, main: { name } }) => ({ id, name }));
  }

  private async dropAllCollections() {
    const collections = await this.dbConnection.listCollections();
    await Promise.all(
      collections
        // If `dynamic-config` is dropped, the server needs to be restarted.
        .filter((collection) => collection.name !== "dynamic-config")
        .map((collection) => this.dbConnection.dropCollection(collection.name)),
    );
  }
}
