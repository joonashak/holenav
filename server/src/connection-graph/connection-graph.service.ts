import { Injectable } from "@nestjs/common";
import { Neo4jService } from "../integration/neo4j/neo4j.service";

@Injectable()
export class ConnectionGraphService {
  constructor(private neoService: Neo4jService) {}

  async test() {
    const res = await this.neoService.read("MATCH (p:Person) RETURN p");
    return res;
  }

  async deleteAll() {
    await this.neoService.write("MATCH (n) DETACH DELETE n");
  }

  async createSystems(systems: Array<{ name: string }>) {
    await this.neoService.write(
      `
      UNWIND $systems as system
      MERGE (s:System {name: system.name})
      ON CREATE SET s += system
    `,
      { systems },
    );
  }

  async createWormholes(wormholes: Array<{ from: string; to: string }>) {
    await this.neoService.write(
      ` 
      UNWIND $wormholes as wh
      MATCH (from:System {name: wh.from})
      MATCH (to:System {name: wh.to})
      MERGE (from)-[:WORMHOLE]->(to)
    `,
      { wormholes },
    );
  }
}
