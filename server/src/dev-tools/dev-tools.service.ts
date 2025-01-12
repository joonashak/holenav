import { Injectable } from "@nestjs/common";
import { InjectConnection } from "@nestjs/mongoose";
import { Connection } from "mongoose";
import { AppDataService } from "../app-data/app-data.service";
import { MockFolderService } from "./mock-data-services/mock-folder.service";

@Injectable()
export class DevToolsService {
  constructor(
    @InjectConnection() private dbConnection: Connection,
    private appDataService: AppDataService,
    private mockFolderService: MockFolderService,
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
  }

  async getMockUsers() {
    // Do not read these from db to avoid potentially leaking actual user data!
    return [];
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
