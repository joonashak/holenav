import { Injectable } from "@nestjs/common";
import { Neo4jService } from "../../../integration/neo4j/neo4j.service";
import { Signature } from "../signature.model";
import { SystemMutationService } from "./system-mutation.service";

@Injectable()
export class ConnectionMutationService {
  constructor(private neoService: Neo4jService, private systemNode: SystemMutationService) {}

  async createConnections(signatures: Signature[], folderId: string) {
    if (!signatures.length) {
      return;
    }

    //await this.systemNode.ensureSystemsExist(signaturesWithUuids, folderId);

    // FIXME: CONNECTS direction should not convey meaning.
    // FIXME: Include wormhole type in Signature instead of CONNECTS.
    // FIXME: Pass also reverse side Signature when creating a new wormhole, all the way from UI.
    // FIXME: Don't create reverse sig here, only connect two sigs.
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
      { signatures, folderId },
    );

    return res;
  }
}
