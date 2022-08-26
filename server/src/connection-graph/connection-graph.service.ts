import { Injectable } from "@nestjs/common";
import { Neo4jService } from "../integration/neo4j/neo4j.service";
import { ConnectionTree, ConnectionTreeNode } from "./dto/connection-tree.dto";
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
      CREATE (from)-[:CONNECTS {wormholeType: 'H296', reverseType: 'K162'}]->(to)
    `,
      { connections },
    );
  }

  async getConnectionTree(rootSystemName: string, folderId: string): Promise<ConnectionTree> {
    // Kudos to glilienfield for helping with this query:
    // https://community.neo4j.com/t5/neo4j-graph-platform/expand-sets-of-multiple-relations-when-querying-for-hierarchical/m-p/59381
    const res = await this.neoService.read(
      ` 
      MATCH connections=(:System {name: $rootSystemName, folderId: $folderId})-[*]-(end:System)
      WHERE size([(end)-[:HAS]->() | 1]) = 1
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

    const connections = res.records.map((record) => ({ ...record._fields[0] }));
    const connectionTree = this.buildConnectionTree(rootSystemName, connections);

    return connectionTree;
  }

  private buildConnectionTree(rootSystemName: string, connections: any[]) {
    const connectionTree = {
      rootSystemName,
      children: this.findChildren(connections, rootSystemName),
    };
    return connectionTree;
  }

  private findChildren(allChildren: any[], currentSystemName: string): ConnectionTreeNode[] {
    // TODO: Make sure this stops on loop.
    const children = allChildren
      .filter(
        (child) =>
          child.from.system.name === currentSystemName ||
          child.to.system.name === currentSystemName,
      )
      .map((child) => {
        const { connection, to, from } = child;
        const reversed = to.system.name === currentSystemName;
        const system = reversed ? from.system : to.system;

        const wormhole = {
          ...connection,
          wormholeType: reversed ? connection.reverseType : connection.wormholeType,
          reverseType: reversed ? connection.wormholeType : connection.reverseType,
        };

        return {
          name: system.name,
          wormhole,
          children: this.findChildren(
            allChildren.filter((c) => c.id !== child.id),
            system.name,
          ),
        };
      });

    return children;
  }
}
