import { Injectable, OnApplicationBootstrap } from "@nestjs/common";

@Injectable()
export class DataMigrationService implements OnApplicationBootstrap {
  onApplicationBootstrap() {
    console.log("bootstrappinggg");
  }
}
