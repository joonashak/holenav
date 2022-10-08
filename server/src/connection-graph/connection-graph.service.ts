import { Injectable } from "@nestjs/common";
import { Neo4jService } from "../integration/neo4j/neo4j.service";
import { GraphConnection, GraphSignature } from "./types";

@Injectable()
export class ConnectionGraphService {
  constructor(private neoService: Neo4jService) {}

  async deleteAll() {
    await this.neoService.write("MATCH (n) DETACH DELETE n");
  }

  // FIXME: Remove this after mockdata generation uses the actual service.
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
      CREATE (from)-[:CONNECTS {
        wormholeType: 'H296',
        reverseType: 'K162',
        eol: false,
        massStatus: 'STABLE'
      }]->(to)
    `,
      { connections },
    );
  }

  async getConnectionGraph(rootSystemName: string, folderId: string): Promise<any> {
    // Kudos to glilienfield for helping with this query:
    // https://community.neo4j.com/t5/neo4j-graph-platform/expand-sets-of-multiple-relations-when-querying-for-hierarchical/m-p/59381
    const res = await this.neoService.read(
      ` 
      MATCH connections=(:System {name: $rootSystemName, folderId: $folderId})-[*]-(end:System)
      WHERE size([(end)-[:HAS]->() | 1]) > 0
      UNWIND [rel IN relationships(connections) WHERE type(rel) = 'CONNECTS'] AS connRel
      WITH 
        startNode(connRel) AS startNode,
        endNode(connRel) AS endNode,
        properties(connRel) AS connProps,
        id(connRel) AS id
      MATCH (startSystem:System)-[:HAS]->(startNode)
      MATCH (endSystem:System)-[:HAS]->(endNode)
      RETURN DISTINCT {
        from: {id: startNode.id, system: properties(startSystem)},
        to: {id: endNode.id, system: properties(endSystem)},
        connection: connProps,
        id: id
      } as connection
    `,
      { rootSystemName, folderId },
    );

    return res.records;
  }
}
