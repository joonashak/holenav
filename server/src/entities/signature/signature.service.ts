import { Injectable } from "@nestjs/common";
import { set } from "lodash";
import { addUuid } from "../../utils/addUuid";
import { Folder } from "../folder/folder.model";
import { CreatableSignature } from "./dto/add-signatures.dto";
import { UpdateableSignature } from "./dto/update-signatures.dto";
import SigType from "./enums/sig-type.enum";
import { ConnectionMutationService } from "./neo/connection-mutation.service";
import { SignatureMutationService } from "./neo/signature-mutation.service";
import { SignatureSearchService } from "./neo/signature-search.service";
import { SystemMutationService } from "./neo/system-mutation.service";
import { Signature } from "./signature.model";
import { addEolAt, addK162, completeSignature, isWormhole } from "./signature.utils";

@Injectable()
export class SignatureService {
  constructor(
    private signatureSearchService: SignatureSearchService,
    private signatureMutationService: SignatureMutationService,
    private connectionMutationService: ConnectionMutationService,
    private systemMutationService: SystemMutationService,
  ) {}

  async getBySystem(systemName: string, folder: Folder): Promise<Signature[]> {
    return this.signatureSearchService.findBySystem({ systemName, folderId: folder.id });
  }

  async createSignatures(signatures: CreatableSignature[], folder: Folder): Promise<Signature[]> {
    if (!signatures.length) {
      return [];
    }

    const sigsWithIds = signatures.map(completeSignature);
    const graphSafeSigs = sigsWithIds.map(
      this.systemMutationService.transformUnknownReverseSystemIntoPseudoSystem,
    );
    await this.signatureMutationService.createSignatures(graphSafeSigs, folder.id);

    const wormholes = graphSafeSigs.filter((sig) => sig.type === SigType.WORMHOLE).map(addEolAt);
    await this.connectionMutationService.createConnectionsFromSignatures(wormholes);

    return sigsWithIds;
  }

  async updateSignatures(sigUpdates: UpdateableSignature[], folder: Folder): Promise<Signature[]> {
    if (!sigUpdates.length) {
      return [];
    }
    // FIXME: Folder ID must be checked to match user's ActiveFolder ID, otherwise folder security depends only on sig ID.
    const ids = sigUpdates.map((sig) => sig.id);
    const oldSigs = await this.signatureSearchService.findManyById(ids);

    return Promise.all(
      sigUpdates.map(async (update) => this.updateSignature(update, oldSigs, folder)),
    );
  }

  /**
   * Delete signatures and their possible reverse wormholes by ID.
   * @param ids IDs of the Signatures to delete.
   * @returns Deleted Signatures (not including possible deleted reverse wormholes).
   */
  async deleteSignatures(ids: string[]): Promise<Signature[]> {
    if (!ids.length) {
      return [];
    }
    return this.signatureMutationService.deleteSignatures(ids);
  }

  private async updateSignature(
    update: UpdateableSignature,
    existing: Signature[],
    folder: Folder,
  ): Promise<Signature> {
    const old = existing.find((sig) => sig.id === update.id);

    if (!isWormhole(old) && isWormhole(update)) {
      const sigWithReverseId = {
        ...completeSignature(update),
        id: update.id,
      } as UpdateableSignature;

      const graphSafeSig = this.systemMutationService.transformUnknownReverseSystemIntoPseudoSystem(
        addEolAt(sigWithReverseId),
      );

      await this.signatureMutationService.createSignatures(
        [graphSafeSig.connection.reverseSignature],
        folder.id,
      );

      await this.signatureMutationService.updateSignatures([graphSafeSig]);
      await this.connectionMutationService.createConnectionsFromSignatures([graphSafeSig]);
      const results = await this.signatureSearchService.findManyById([graphSafeSig.id]);
      return results[0];
    }

    if (isWormhole(old) && !isWormhole(update)) {
      await this.signatureMutationService.deleteSignatures([old.connection.reverseSignature.id]);
    }

    if (isWormhole(old) && isWormhole(update)) {
      const updateWithEol =
        !old.connection.eol && update.connection.eol
          ? addEolAt(update)
          : { ...update, connection: { ...update.connection, eolAt: old.connection.eolAt } };

      // Destination not changed.
      if (
        old.connection.reverseSignature.systemName === update.connection.reverseSignature.systemName
      ) {
        const modifiedUpdate = addK162(updateWithEol);
        await this.signatureMutationService.updateSignatures([
          modifiedUpdate,
          modifiedUpdate.connection.reverseSignature,
        ]);
        return this.connectionMutationService.updateConnection(modifiedUpdate);
      }

      // Destination changed: Recreate connection and reverse signature.
      const graphSafeUpdate =
        this.systemMutationService.transformUnknownReverseSystemIntoPseudoSystem(updateWithEol);
      const newReverseSig = addUuid(graphSafeUpdate.connection.reverseSignature, {
        overwrite: true,
      });
      const updatedSig = addK162(
        set(graphSafeUpdate, "connection.reverseSignature", newReverseSig),
      );

      await this.signatureMutationService.updateSignatures([updatedSig]);
      await this.signatureMutationService.deleteSignatures([old.connection.reverseSignature.id]);

      await this.signatureMutationService.createSignatures(
        [updatedSig.connection.reverseSignature],
        folder.id,
      );
      await this.connectionMutationService.createConnectionsFromSignatures([updatedSig]);

      return updatedSig;
    }

    const res = await this.signatureMutationService.updateSignatures([update]);
    return res[0];
  }
}
