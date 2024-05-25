import { Injectable } from "@nestjs/common";
import { Neo4jService } from "../../../integration/neo4j/neo4j.service";
import { mapDateTimeToJsDateByKey } from "../../../utils/dateConverters";
import { UpdateableSignature } from "../dto/update-signatures.dto";
import { Signature } from "../signature.model";
import { sanitizeSignatureForNeo4j } from "../signature.utils";

@Injectable()
export class ConnectionMutationService {
  constructor(private neoService: Neo4jService) {}

  async createConnectionsFromSignatures(
    signatures: Signature[] | UpdateableSignature[],
  ) {
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
          eolAt: datetime(sig.connection.eolAt),
          massStatus: sig.connection.massStatus
        }]->(to)
      `,
      { signatures: signatures.map(sanitizeSignatureForNeo4j) },
    );
    return res;
  }

  async updateConnection(signature: UpdateableSignature) {
    const res = await this.neoService.write(
      `
        MATCH (from:System)-[:HAS]-(sig:Signature {id: $signature.id})-[conn:CONNECTS]-(rev:Signature {id: $signature.connection.reverseSignature.id})-[:HAS]-(to:System)
        SET conn += {
          eol: $signature.connection.eol,
          eolAt: datetime($signature.connection.eolAt),
          massStatus: $signature.connection.massStatus
        }
        RETURN sig{
          .*,
          systemName: from.name,
          connection: conn{
            .*,
            reverseSignature: rev{
              .*,
              systemName: to.name
            }
          }
        }
      `,
      { signature: sanitizeSignatureForNeo4j(signature) },
    );

    return res.records
      .map((rec) => rec._fields[0])
      .map(mapDateTimeToJsDateByKey(["createdAt", "connection.eolAt"]))[0];
  }
}
