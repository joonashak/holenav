import { Injectable, Logger } from "@nestjs/common";
import neo4j, { Driver, SessionMode } from "neo4j-driver";
import { NEO_DB, NEO_PASSWORD, NEO_URL, NEO_USERNAME } from "../../config";

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

  async read(query: string, params?: Record<string, string>) {
    const session = this.getSession(neo4j.session.READ);
    let result;

    try {
      result = await session.readTransaction((tx) => tx.run(query, params));
    } finally {
      await session.close();
    }

    return result;
  }

  async write(query: string, params?: Record<string, string>) {
    const session = this.getSession(neo4j.session.WRITE);
    let result;

    try {
      result = await session.writeTransaction((tx) => tx.run(query, params));
    } finally {
      await session.close();
    }

    return result;
  }

  private getSession(mode: SessionMode) {
    return this.driver.session({
      database: NEO_DB,
      defaultAccessMode: mode,
    });
  }

  private async verifyConnection() {
    try {
      await this.driver.verifyConnectivity();
    } catch (error) {
      this.logger.error("Could not connect to Neo4j instance.", error);
      throw error;
    }
  }
}
