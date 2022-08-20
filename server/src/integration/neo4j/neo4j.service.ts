import { Injectable, Logger } from "@nestjs/common";
import neo4j, { Driver } from "neo4j-driver";
import { NEO_PASSWORD, NEO_URL, NEO_USERNAME } from "../../config";

@Injectable()
export class Neo4jService {
  private readonly logger = new Logger(Neo4jService.name);
  private driver: Driver;

  async onModuleInit() {
    console.log("Creating Neo4j driver.");
    this.driver = neo4j.driver(NEO_URL, neo4j.auth.basic(NEO_USERNAME, NEO_PASSWORD));
    await this.verifyConnection();
  }

  async onModuleDestroy() {
    await this.driver.close();
  }

  async verifyConnection() {
    try {
      await this.driver.verifyConnectivity();
    } catch (error) {
      this.logger.error("Could not connect to Neo4j instance.", error);
      throw error;
    }
  }
}
