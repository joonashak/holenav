import { Injectable } from "@nestjs/common";
import { set } from "lodash";
import { addUuid } from "../../utils/addUuid";
import { CreatableSignature } from "./dto/add-signatures.dto";
import { UpdateableSignature } from "./dto/update-signatures.dto";
import SigType from "./enums/sig-type.enum";
import { ConnectionMutationService } from "./neo/connection-mutation.service";
import { SignatureMutationService } from "./neo/signature-mutation.service";
import { SignatureSearchService } from "./neo/signature-search.service";
import { SystemMutationService } from "./neo/system-mutation.service";
import { Signature } from "./signature.model";
import {
  addEolAt,
  addK162,
  completeSignature,
  isWormhole,
} from "./signature.utils";

@Injectable()
export class SignatureService {
  constructor(
    private signatureSearchService: SignatureSearchService,
    private signatureMutationService: SignatureMutationService,
    private connectionMutationService: ConnectionMutationService,
    private systemMutationService: SystemMutationService,
  ) {}

  async getBySystem(
    systemName: string,
    folderId: string,
  ): Promise<Signature[]> {
    return this.signatureSearchService.findBySystem({
      systemName,
      folderId,
    });
  }

  async createSignatures(
    signatures: CreatableSignature[],
    folderId: string,
  ): Promise<Signature[]> {
    if (!signatures.length) {
      return [];
    }

    const sigsWithIds = signatures.map(completeSignature);
    const graphSafeSigs = sigsWithIds.map(
      this.systemMutationService.transformUnknownReverseSystemIntoPseudoSystem,
    );
    await this.signatureMutationService.createSignatures(
      graphSafeSigs,
      folderId,
    );

    const wormholes = graphSafeSigs
      .filter((sig) => sig.type === SigType.WORMHOLE)
      .map(addEolAt);
    await this.connectionMutationService.createConnectionsFromSignatures(
      wormholes,
    );

    const created = await this.signatureSearchService.findManyById(
      sigsWithIds.map((sig) => sig.id),
    );
    return created;
  }

  async updateSignatures(
    sigUpdates: UpdateableSignature[],
    folderId: string,
  ): Promise<Signature[]> {
    if (!sigUpdates.length) {
      return [];
    }
    // FIXME: Folder ID must be checked to match user's ActiveFolder ID, otherwise folder security depends only on sig ID.
    const ids = sigUpdates.map((sig) => sig.id);
    const oldSigs = await this.signatureSearchService.findManyById(ids);

    return Promise.all(
      sigUpdates.map(async (update) =>
        this.updateSignature(update, oldSigs, folderId),
      ),
    );
  }

  /**
   * Delete signatures and their possible reverse wormholes by ID.
   *
   * @param ids IDs of the Signatures to delete.
   * @returns Deleted Signatures (not including possible deleted reverse
   *   wormholes).
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
    folderId: string,
  ): Promise<Signature> {
    const old = existing.find((sig) => sig.id === update.id);

    if (!isWormhole(old) && isWormhole(update)) {
      const sigWithReverseId = {
        ...completeSignature(update),
        id: update.id,
      } as UpdateableSignature;

      const graphSafeSig =
        this.systemMutationService.transformUnknownReverseSystemIntoPseudoSystem(
          addEolAt(sigWithReverseId),
        );

      await this.signatureMutationService.createSignatures(
        [graphSafeSig.connection.reverseSignature],
        folderId,
      );

      await this.signatureMutationService.updateSignatures([graphSafeSig]);
      await this.connectionMutationService.createConnectionsFromSignatures([
        graphSafeSig,
      ]);
      const results = await this.signatureSearchService.findManyById([
        graphSafeSig.id,
      ]);
      return results[0];
    }

    if (isWormhole(old) && !isWormhole(update)) {
      await this.signatureMutationService.deleteSignatures([
        old.connection.reverseSignature.id,
      ]);
    }

    if (isWormhole(old) && isWormhole(update)) {
      const updateWithEol =
        !old.connection.eol && update.connection.eol
          ? addEolAt(update)
          : {
              ...update,
              connection: { ...update.connection, eolAt: old.connection.eolAt },
            };

      // Destination not changed.
      if (
        old.connection.reverseSignature.systemName ===
        update.connection.reverseSignature.systemName
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
        this.systemMutationService.transformUnknownReverseSystemIntoPseudoSystem(
          updateWithEol,
        );
      const newReverseSig = addUuid(
        graphSafeUpdate.connection.reverseSignature,
        {
          overwrite: true,
        },
      );
      const updatedSig = addK162(
        set(graphSafeUpdate, "connection.reverseSignature", newReverseSig),
      );

      await this.signatureMutationService.updateSignatures([updatedSig]);
      await this.signatureMutationService.deleteSignatures([
        old.connection.reverseSignature.id,
      ]);

      await this.signatureMutationService.createSignatures(
        [updatedSig.connection.reverseSignature],
        folderId,
      );
      await this.connectionMutationService.createConnectionsFromSignatures([
        updatedSig,
      ]);

      return (
        await this.signatureSearchService.findManyById([updatedSig.id])
      )[0];
    }

    const res = await this.signatureMutationService.updateSignatures([update]);
    return res[0];
  }
}
