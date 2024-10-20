/* eslint-disable @typescript-eslint/no-unused-vars */
import { User } from "@joonashak/nestjs-clone-bay";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ConnectionService } from "../connection/connection.service";
import { CreateSignature } from "./dto/add-signatures.dto";
import SigType from "./enums/sig-type.enum";
import { Signature } from "./signature.model";

@Injectable()
export class SignatureService {
  constructor(
    @InjectModel(Signature.name) private signatureModel: Model<Signature>,
    private connectionService: ConnectionService,
  ) {}

  async getBySystem(
    systemName: string,
    folderId: string,
  ): Promise<Signature[]> {
    return [];
  }

  /**
   * Create signature and optional connection.
   *
   * If given signature is a wormhole, it must contain the
   * `Signature.connection` object. The respective `Connection` document is
   * created by this method and linked to the new `Signature`.
   */
  async createSignature(
    signature: CreateSignature,
    user?: User,
  ): Promise<Signature> {
    // Create new connection for wormholes.
    const connection =
      signature.type === SigType.WORMHOLE
        ? await this.connectionService.create(signature.connection)
        : null;

    const created = await this.signatureModel.create({
      ...signature,
      connection,
      createdBy: user?.main.name || "",
    });

    return created;
  }

  async createSignatures(
    signatures: CreateSignature[],
    user?: User,
  ): Promise<Signature[]> {
    return Promise.all(
      signatures.map((sig) => this.createSignature(sig, user)),
    );
  }

  async updateSignatures(
    sigUpdates: unknown[],
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
