import { Injectable } from "@nestjs/common";
import { set } from "lodash";
import { v4 as uuid } from "uuid";
import { Neo4jService } from "../../../integration/neo4j/neo4j.service";
import { Signature } from "../signature.model";
import { SystemNode } from "./system.node";

@Injectable()
export class ConnectionMutationService {
  constructor(private neoService: Neo4jService, private systemNode: SystemNode) {}

  async createConnections(signatures: Signature[], folderId: string) {
    if (!signatures.length) {
      return;
    }

    const signaturesWithUuids = signatures.map(this.replaceEmptyDestinationWithPseudoSystem);
    await this.systemNode.ensureSystemsExist(signaturesWithUuids, folderId);

    // FIXME: Set CONNECTS direction by type.
    const res = await this.neoService.write(
      `
      UNWIND $signatures as sig
      MATCH (from:Signature {id: sig.id})
      MERGE (dest:System {name: sig.connection.destinationName, folderId: $folderId})
      CREATE (to:Signature {
        id: randomUUID(),
        eveId: '',
        type: 'WH',
        name: ''
      })
      CREATE (dest)-[:HAS]->(to)
      CREATE (from)-[:CONNECTS {
        wormholeType: sig.connection.wormholeType,
        reverseType: sig.connection.reverseType,
        eol: sig.connection.eol,
        massStatus: sig.connection.massStatus
      }]->(to)
      `,
      { signatures: signaturesWithUuids, folderId },
    );

    return res;
  }

  private replaceEmptyDestinationWithPseudoSystem(signature: Signature): Signature {
    const unknownDestination = !signature.connection.destinationName;
    const insertableSignature = set(signature, "connection.unknownDestination", unknownDestination);

    if (unknownDestination) {
      return set(insertableSignature, "connection.destinationName", uuid());
    }

    return insertableSignature;
  }
}
