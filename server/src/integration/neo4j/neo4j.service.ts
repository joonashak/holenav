import { Injectable, Logger } from "@nestjs/common";
import retry from "async-retry";
import neo4j, { Driver, SessionMode } from "neo4j-driver";
import { NEO_DB, NEO_PASSWORD, NEO_URL, NEO_USERNAME } from "../../config";

@Injectable()
export class Neo4jService {
  private readonly logger = new Logger(Neo4jService.name);
  private driver: Driver;

  async onModuleInit() {
    await retry(async () => this.connect());
  }

  async onModuleDestroy() {
    await this.driver.close();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async read(query: string, params?: any) {
    const session = this.getSession(neo4j.session.READ);
    let result;

    try {
      result = await session.readTransaction((tx) => tx.run(query, params));
    } finally {
      await session.close();
    }

    return result;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async write(query: string, params?: any) {
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

  private async connect() {
    this.logger.log("Connecting to Neo4j...");

    try {
      const driver = neo4j.driver(
        NEO_URL,
        neo4j.auth.basic(NEO_USERNAME, NEO_PASSWORD),
        {
          disableLosslessIntegers: true,
        },
      );

      await driver.verifyConnectivity();
      this.driver = driver;
      this.logger.log("Connected to Neo4j.");
    } catch (error) {
      this.logger.warn("Could not connect to Neo4j. Retrying...");
      throw error;
    }
  }
}
