import { Injectable } from "@nestjs/common";
import { Neo4jService } from "../../../integration/neo4j/neo4j.service";
import { mapDateTimeToJsDateByKey } from "../../../utils/dateConverters";
import { Signature } from "../signature.model";

export type SignatureSearchParams = {
  systemName: string;
  folderId: string;
};

type SignatureQueryBase = {
  minAgeHrs?: number;
};

type SignatureQueryNonWh = SignatureQueryBase & {
  type: "other";
};

type SignatureQueryWh = SignatureQueryBase & {
  type: "wormhole";
  whTypes?: string[];
  eol?: boolean;
  minEolAgeHrs?: number;
};

type SignatureQuery = SignatureQueryNonWh | SignatureQueryWh;

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

  /** Find sigs matching given criteria. For internal use. */
  async findByQuery(query: SignatureQuery): Promise<Signature[]> {
    return query.type === "wormhole"
      ? this.findWormholesByQuery(query)
      : this.findNonWhSigsByQuery(query);
  }

  private async findNonWhSigsByQuery({
    minAgeHrs,
  }: SignatureQueryNonWh): Promise<Signature[]> {
    const res = await this.neoService.read(
      `
        MATCH (sig:Signature)
        WHERE sig.createdAt < datetime() - duration({hours: $minAgeHrs})
          AND sig.type <> 'WH'
        RETURN sig
      `,
      { minAgeHrs },
    );

    return res.records.map((r) => r._fields[0].properties);
  }

  private async findWormholesByQuery({
    minAgeHrs,
    whTypes,
    eol,
    minEolAgeHrs,
  }: SignatureQueryWh): Promise<Signature[]> {
    const minAgePredicate =
      minAgeHrs === undefined
        ? ""
        : "AND sig.createdAt < datetime() - duration({hours: $minAgeHrs})";
    const whTypePredicate =
      whTypes === undefined ? "" : "AND sig.wormholeType IN $whTypes";
    const eolPredicate = eol === undefined ? "" : "AND conn.eol = $eol";
    const minEolAgePredicate =
      minEolAgeHrs === undefined
        ? ""
        : `AND conn.eolAt < datetime() - duration({hours: $minEolAgeHrs})`;

    const res = await this.neoService.read(
      `
        MATCH (sig:Signature {type: 'WH'})-[conn:CONNECTS]-(rev:Signature)
        WHERE sig.type = 'WH'
          ${whTypePredicate}
          ${minAgePredicate}
          ${eolPredicate}
          ${minEolAgePredicate}
        RETURN sig{
          .*,
          connection: conn{
            .*,
            reverseSignature: rev{
              .*
            }
          }
        }
    `,
      { minAgeHrs, whTypes, eol, minEolAgeHrs },
    );

    return res.records.map((r) => r._fields[0]);
  }
}
