/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from "@nestjs/common";
import { CreatableSignature } from "./dto/add-signatures.dto";
import { UpdateableSignature } from "./dto/update-signatures.dto";
import { Signature } from "./signature.model";

@Injectable()
export class SignatureService {
  constructor() {}

  async getBySystem(
    systemName: string,
    folderId: string,
  ): Promise<Signature[]> {
    return [];
  }

  async createSignatures(
    signatures: CreatableSignature[],
    folderId: string,
  ): Promise<Signature[]> {
    return [];
  }

  async updateSignatures(
    sigUpdates: UpdateableSignature[],
    folderId: string,
  ): Promise<Signature[]> {
    return [];
  }

  /**
   * Delete signatures and their possible reverse wormholes by ID.
   *
   * @param ids IDs of the Signatures to delete.
   * @returns Deleted Signatures (not including possible deleted reverse
   *   wormholes).
   */
  async deleteSignatures(ids: string[]): Promise<Signature[]> {
    return [];
  }
}
