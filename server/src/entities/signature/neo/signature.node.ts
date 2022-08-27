import { Injectable } from "@nestjs/common";
import { Neo4jService } from "../../../integration/neo4j/neo4j.service";
import { Signature } from "../signature.model";

@Injectable()
export class SignatureNode {
  constructor(private neoService: Neo4jService) {}

  async findBySystem(params: { systemName: string; folderId: string }): Promise<Signature[]> {
    const res = await this.neoService.read(
      `
      MATCH (:System {name: $systemName, folderId: $folderId})-[:HAS]->(sig:Signature)
      MATCH (:System {name: $systemName, folderId: $folderId})-[:HAS]->(wh:Signature)-[conn:CONNECTS]-(:Signature)<-[:HAS]-(to:System)
      WHERE sig.type <> 'WH'
      WITH
        sig{ .*, systemName: $systemName} AS sigs,
        wh{
          .*,
          systemName: $systemName,
          connection: conn{ 
            .*,
            destinationName: to.name
          } 
        } AS wormholes
      RETURN collect(DISTINCT sigs) + collect(DISTINCT wormholes)
    `,
      params,
    );

    return res.records[0]._fields[0];
  }

  /**
   * Create many signatures in a given folder. Each created Signature is linked to a System
   * with the given `folderId`. Systems are not created if they don't exist.
   * @param signatures Signatures to create.
   * @param folderId ID of the Folder to use.
   * @returns Created Signatures.
   */
  async createSignatures(signatures: Signature[], folderId: string): Promise<Signature[]> {
    const res = await this.neoService.write(
      ` 
      UNWIND $signatures as sig
      MATCH (system:System {name: sig.systemName, folderId: $folderId})
      CREATE (newSig:Signature {
        id: sig.id,
        eveId: sig.eveId,
        type: sig.type,
        name: sig.name
      })
      CREATE (system)-[:HAS]->(newSig)
      RETURN newSig
    `,
      { signatures, folderId },
    );

    return res.records.map((rec) => rec._fields[0].properties);
  }
}
