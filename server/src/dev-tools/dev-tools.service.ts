import { Injectable } from "@nestjs/common";
import { InjectConnection } from "@nestjs/mongoose";
import { Connection } from "mongoose";

@Injectable()
export class DevToolsService {
  constructor(@InjectConnection() private dbConnection: Connection) {}

  /** Clear entire database. */
  async resetDatabase() {
    await this.dropAllCollections();
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
