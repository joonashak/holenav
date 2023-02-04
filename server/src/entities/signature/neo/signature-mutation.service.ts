import { Injectable } from "@nestjs/common";
import { compact, omit } from "lodash";
import { Neo4jService } from "../../../integration/neo4j/neo4j.service";
import { mapDateTimeToJsDateByKey } from "../../../utils/dateConverters";
import { CreatableSignature, CreatableSignatureWithoutConnection } from "../dto/add-signatures.dto";
import { UpdateableSignature } from "../dto/update-signatures.dto";
import { Signature } from "../signature.model";
import { SystemMutationService } from "./system-mutation.service";

@Injectable()
export class SignatureMutationService {
  constructor(private neoService: Neo4jService, private systemNode: SystemMutationService) {}

  /**
   * Create many signatures in a given folder. Each created Signature is linked to a System
   * with the given `folderId`. Systems are not created if they don't exist.
   * @param signatures Signatures to create.
   * @param folderId ID of the Folder to use.
   * @returns Created Signatures.
   */
  async createSignatures(signatures: CreatableSignature[], folderId: string): Promise<Signature[]> {
    if (!signatures.length) {
      return [];
    }

    const signaturesToCreate = this.getSignaturesAndReverseSignatures(signatures);
    await this.systemNode.ensureSystemsExist(signaturesToCreate, folderId);

    const res = await this.neoService.write(
      ` 
      UNWIND $signatures as sig
      MATCH (system:System {name: sig.systemName, folderId: $folderId})
      CREATE (newSig:Signature {
        id: sig.id,
        eveId: sig.eveId,
        type: sig.type,
        name: sig.name,
        wormholeType: sig.wormholeType,
        createdAt: datetime()
      })
      CREATE (system)-[:HAS]->(newSig)
      RETURN newSig
    `,
      { signatures: signaturesToCreate, folderId },
    );

    const newSignatures = res.records
      .map((rec) => rec._fields[0].properties)
      .map(mapDateTimeToJsDateByKey(["createdAt", "connection.eolAt"]));

    return newSignatures;
  }

  /**
   * Update signatures by ID. Changing host system or folder is not supported.
   */
  async updateSignatures(signatures: UpdateableSignature[]): Promise<Signature[]> {
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
        name: sig.name,
        wormholeType: sig.wormholeType
      }
      RETURN signature{.*, systemName: system.name}
      `,
      { signatures },
    );

    const updatedSignatures = res.records
      .map((rec) => rec._fields[0])
      .map(mapDateTimeToJsDateByKey(["createdAt", "connection.eolAt"]));

    return updatedSignatures;
  }

  async deleteSignatures(signatureIds: string[]): Promise<Signature[]> {
    if (!signatureIds.length) {
      return [];
    }

    const res = await this.neoService.write(
      `
        UNWIND $signatureIds as id
        MATCH (signature:Signature {id: id})-[:CONNECTS*0..1]-(:Signature)
        MATCH (:Signature {id: id})-[:HAS]-(system:System)
        WITH signature, system, properties(signature) AS deleted
        DETACH DELETE signature
        RETURN deleted{.*, systemName: system.name}
      `,
      { signatureIds },
    );

    await this.systemNode.removeDanglingPseudoSystems();

    const deletedSignatures = res.records
      .map((rec) => rec._fields[0])
      .map(mapDateTimeToJsDateByKey(["createdAt", "connection.eolAt"]));

    return deletedSignatures;
  }

  async markAsEol(signatureIds: string[]): Promise<void> {
    if (!signatureIds.length) {
      return;
    }

    await this.neoService.write(
      `
        UNWIND $signatureIds as id
        MATCH (:Signature {id: id})-[conn:CONNECTS]-()
        SET conn += {
          eol: true,
          eolAt: datetime()
        }
      `,
      { signatureIds },
    );
  }

  private getSignaturesAndReverseSignatures(
    signatures: CreatableSignature[],
  ): CreatableSignatureWithoutConnection[] {
    const signaturesWithoutConnections = signatures.map((sig) => omit(sig, "connection"));
    const reverseSignatures = compact(
      signatures.map((sig) => sig.connection?.reverseSignature || null),
    );

    return signaturesWithoutConnections.concat(reverseSignatures);
  }
}
