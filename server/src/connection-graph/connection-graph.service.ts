import { Injectable } from "@nestjs/common";
import { Neo4jService } from "../integration/neo4j/neo4j.service";
import { GraphConnection, GraphSignature, GraphSystem } from "./types";

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

  async createSystems(systems: GraphSystem[]) {
    await this.neoService.write(
      `
      UNWIND $systems as system
      MERGE (s:System {name: system.name, folderId: system.folderId})
      ON CREATE SET s += system
    `,
      { systems },
    );
  }

  async createSignatures(signatures: GraphSignature[]) {
    // FIXME: Set proper id (eveId used for nice view in Neo browser).
    // FIXME: Using id = eveId will break things upon duplicate eveId!
    await this.neoService.write(
      ` 
      UNWIND $signatures as sig
      MATCH (system:System {name: sig.systemName, folderId: sig.folderId})
      CREATE (newSig:Signature {id: sig.eveId, eveId: sig.eveId})
      MERGE (system)-[:HAS]->(newSig)
    `,
      { signatures },
    );
  }

  async createConnections(connections: GraphConnection[]) {
    await this.neoService.write(
      ` 
      UNWIND $connections as conn
      MATCH (from:Signature {id: conn.from})
      MATCH (to:Signature {id: conn.to})
      CREATE (from)-[:CONNECTS]->(to)
    `,
      { connections },
    );
  }

  async getConnectionGraph() {
    const res = this.neoService.read(` 
    MATCH (s:System {name: 'Jita'})-[HAS]->(d:Signature)<-[c:CONNECTS]->(x:Signature)<-[y:HAS]-(z:System)
    RETURN s, d, c, x, y, z
    `);

    return res;
  }
}
