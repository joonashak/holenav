import { Injectable } from "@nestjs/common";
import { Neo4jService } from "../../../integration/neo4j/neo4j.service";
import { mapDateTimeToJsDateByKey } from "../../../utils/dateConverters";
import { Signature } from "../signature.model";

export type SignatureSearchParams = {
  systemName: string;
  folderId: string;
};

@Injectable()
export class SignatureSearchService {
  constructor(private neoService: Neo4jService) {}

  async findBySystem(params: SignatureSearchParams): Promise<Signature[]> {
    const res = await this.neoService.read(
      `
      MATCH (origin:System {name: $systemName, folderId: $folderId})-[:HAS]-(sig:Signature)
      OPTIONAL MATCH (sig)-[conn:CONNECTS]-(destSig:Signature)-[:HAS]-(dest:System)
      RETURN
      CASE
        WHEN destSig IS NOT NULL THEN sig{
          .*,
          systemName: origin.name,
          connection: conn{
            .*,
            reverseSignature: destSig{
              .*,
              systemName: dest.name
            }
          }
        }
        ELSE sig{.*, systemName: origin.name}
      END AS signature
      `,
      params,
    );

    if (!res.records.length) {
      return [];
    }

    const signatures = res.records
      .map((rec) => rec._fields[0])
      .map(mapDateTimeToJsDateByKey(["createdAt", "connection.eolAt"]));

    return signatures;
  }

  async findManyById(ids: string[]): Promise<Signature[]> {
    if (!ids.length) {
      return [];
    }

    const res = await this.neoService.read(
      `
      UNWIND $ids as id
      MATCH (origin:System)-[:HAS]-(sig:Signature {id: id})
      OPTIONAL MATCH (sig)-[conn:CONNECTS]-(destSig:Signature)-[:HAS]-(dest:System)
      RETURN
      CASE
        WHEN destSig IS NOT NULL THEN sig{
          .*,
          systemName: origin.name,
          connection: conn{
            .*,
            reverseSignature: destSig{
              .*,
              systemName: dest.name
            }
          }
        }
        ELSE sig{.*, systemName: origin.name}
      END AS signature
      `,
      { ids },
    );

    const signatures = res.records
      .map((rec) => rec._fields[0])
      .map(mapDateTimeToJsDateByKey(["createdAt", "connection.eolAt"]));

    return signatures;
  }
}
