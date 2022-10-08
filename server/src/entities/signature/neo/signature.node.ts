import { Injectable } from "@nestjs/common";
import { Neo4jService } from "../../../integration/neo4j/neo4j.service";
import { Signature } from "../signature.model";

@Injectable()
export class SignatureNode {
  constructor(private neoService: Neo4jService) {}

  async createConnections(signatures: Signature[], folderId: string) {
    if (!signatures.length) {
      return;
    }

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
      { signatures, folderId },
    );
    console.log(res);
  }
}
