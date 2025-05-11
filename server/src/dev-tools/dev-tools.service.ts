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

    // If `dynamic-config` is dropped, the server needs to be restarted.
    // `users` and `sessions` are deleted by the library.
    const skipCollections = ["dynamic-config", "users", "sessions"];

    await Promise.all(
      collections
        .filter((collection) => !skipCollections.includes(collection.name))
        .map((collection) => this.dbConnection.dropCollection(collection.name)),
    );
  }
}
