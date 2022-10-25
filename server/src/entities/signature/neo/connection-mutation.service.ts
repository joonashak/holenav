import { Injectable } from "@nestjs/common";
import { Neo4jService } from "../../../integration/neo4j/neo4j.service";
import { Signature } from "../signature.model";

@Injectable()
export class ConnectionMutationService {
  constructor(private neoService: Neo4jService) {}

  async createConnectionsFromSignatures(signatures: Signature[]) {
    if (!signatures.length) {
      return;
    }

    const res = await this.neoService.write(
      `
      UNWIND $signatures as sig
      MATCH (from:Signature {id: sig.id})
      MATCH (to:Signature {id: sig.connection.reverseSignature.id})
      CREATE (from)-[:CONNECTS {
        eol: sig.connection.eol,
        massStatus: sig.connection.massStatus
      }]->(to)
      `,
      { signatures },
    );

    return res;
  }
}
