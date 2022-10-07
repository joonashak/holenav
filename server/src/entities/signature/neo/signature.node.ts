import { Injectable } from "@nestjs/common";
import { Neo4jService } from "../../../integration/neo4j/neo4j.service";
import { Signature } from "../signature.model";

@Injectable()
export class SignatureNode {
  constructor(private neoService: Neo4jService) {}

  /**
   * Create many signatures in a given folder. Each created Signature is linked to a System
   * with the given `folderId`. Systems are not created if they don't exist.
   * @param signatures Signatures to create.
   * @param folderId ID of the Folder to use.
   * @returns Created Signatures.
   */
  async createSignatures(signatures: Signature[], folderId: string): Promise<Signature[]> {
    if (!signatures.length) {
      return [];
    }

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
