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

  private async findSignaturesBySystem(params: SignatureSearchParams): Promise<Signature[]> {
    const res = await this.neoService.read(
      `
      MATCH (:System {name: $systemName, folderId: $folderId})-[:HAS]->(sig:Signature)
      WHERE sig.type <> 'WH'
      WITH
        sig{ .*, systemName: $systemName} AS sigs
      RETURN collect(DISTINCT sigs)
    `,
      params,
    );

    return res.records[0]._fields[0];
  }

  private async findWormholesBySystem(params: SignatureSearchParams): Promise<Signature[]> {
    const res = await this.neoService.read(
      `
      MATCH (:System {name: $systemName, folderId: $folderId})-[:HAS]->(wh:Signature)-[conn:CONNECTS]-(:Signature)<-[:HAS]-(to:System)
      WITH
        wh{
          .*,
          systemName: $systemName,
          connection: conn{ 
            .*,
            destinationName: to.name,
            wormholeType: CASE startNode(conn) WHEN wh THEN conn.wormholeType ELSE conn.reverseType END,
            reverseType: CASE startNode(conn) WHEN wh THEN conn.reverseType ELSE conn.wormholeType END
          } 
        } AS wormholes
      RETURN collect(DISTINCT wormholes)
    `,
      params,
    );

    return res.records[0]._fields[0];
  }
}
