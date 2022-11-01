import { Injectable } from "@nestjs/common";
import { Neo4jService } from "../../../integration/neo4j/neo4j.service";
import { Signature } from "../signature.model";

export type SignatureSearchParams = {
  systemName: string;
  folderId: string;
};

@Injectable()
export class SignatureSearchService {
  constructor(private neoService: Neo4jService) {}

  async findBySystem(params: SignatureSearchParams): Promise<Signature[]> {
    const signatures = await this.findSignaturesBySystem(params);
    const wormholes = await this.findWormholesBySystem(params);
    return signatures.concat(wormholes);
  }

  async findManyById(ids: string[]): Promise<Signature[]> {
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

    return res.records[0]._fields;
  }

  private async findSignaturesBySystem(params: SignatureSearchParams): Promise<Signature[]> {
    const res = await this.neoService.read(
      `
      MATCH (:System {name: $systemName, folderId: $folderId})-[:HAS]->(sig:Signature)
      WHERE sig.type <> 'WH'
      WITH
        sig{.*, systemName: $systemName} AS sigs
      RETURN collect(DISTINCT sigs)
    `,
      params,
    );

    return res.records[0]._fields[0];
  }

  private async findWormholesBySystem(params: SignatureSearchParams): Promise<Signature[]> {
    const res = await this.neoService.read(
      `
      MATCH (origin:System {name: $systemName, folderId: $folderId})-[:HAS]->(originSig:Signature)-[conn:CONNECTS]-(destSig:Signature)<-[:HAS]-(dest:System)
      WITH
        originSig{
          .*,
          systemName: origin.name,
          connection: conn{ 
            .*,
            reverseSignature: destSig{
              .*,
              systemName: dest.name
            }
          } 
        } AS wormholes
      RETURN collect(DISTINCT wormholes)
    `,
      params,
    );

    return res.records[0]._fields[0];
  }
}
