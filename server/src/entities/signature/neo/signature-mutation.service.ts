import { Injectable } from "@nestjs/common";
import { Neo4jService } from "../../../integration/neo4j/neo4j.service";
import { Signature } from "../signature.model";
import { SystemNode } from "./system.node";

@Injectable()
export class SignatureMutationService {
  constructor(private neoService: Neo4jService, private systemNode: SystemNode) {}

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

    await this.systemNode.ensureSystemsExist(signatures, folderId);

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

  /**
   * Update signatures by ID. Changing host system or folder is not supported.
   */
  async updateSignatures(signatures: Signature[]): Promise<Signature[]> {
    if (!signatures.length) {
      return [];
    }

    const res = await this.neoService.write(
      `
      UNWIND $signatures as sig
      MATCH (signature:Signature {id: sig.id})-[:HAS]-(system:System)
      SET signature += {
        eveId: sig.eveId,
        type: sig.type,
        name: sig.name
      }
      RETURN signature{.*, systemName: system.name}
      `,
      { signatures },
    );

    return res.records[0]._fields[0];
  }

  async deleteSignatures(signatureIds: string[]): Promise<Signature[]> {
    if (!signatureIds) {
      return [];
    }

    const res = await this.neoService.write(
      `
        UNWIND $signatureIds as id
        MATCH (:Signature {id: id})-[:CONNECTS*0..1]-(signature:Signature)
        MATCH (:Signature {id: id})-[:HAS]-(system:System)
        WITH signature, system, properties(signature) AS deleted
        DETACH DELETE signature
        RETURN deleted{.*, systemName: system.name}
      `,
      { signatureIds },
    );

    await this.systemNode.removeDanglingPseudoSystems();

    return res.records.map((rec) => rec._fields[0]);
  }
}
