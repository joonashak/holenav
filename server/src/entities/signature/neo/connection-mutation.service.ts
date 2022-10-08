import { Injectable } from "@nestjs/common";
import { uniqWith, isEqual, compact, set } from "lodash";
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

    const signaturesWithUuids = signatures.map(this.replaceEmptyDestinationWithUuid);
    await this.ensureSystemsExist(signaturesWithUuids, folderId);

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

  private async ensureSystemsExist(signatures: Signature[], folderId: string) {
    const hostSystemNames = compact(signatures.map((sig) => sig.systemName));
    const destinationNames = signatures
      .filter((sig) => sig.connection)
      .map((sig) => sig.connection.destinationName);

    const systemNames = hostSystemNames.concat(destinationNames);
    const systems = systemNames.map((name) => ({ name, folderId }));

    const uniqueSystems = uniqWith(systems, isEqual);
    await this.systemNode.upsertSystems(uniqueSystems);
  }

  private replaceEmptyDestinationWithUuid(signature: Signature): Signature {
    if (!signature.connection.destinationName) {
      return set(signature, "connection.destinationName", uuid());
    }
    return signature;
  }
}
