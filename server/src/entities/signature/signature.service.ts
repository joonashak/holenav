/* eslint-disable @typescript-eslint/no-unused-vars */
import { User } from "@joonashak/nestjs-clone-bay";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ConnectionService } from "../connection/connection.service";
import { Folder } from "../folder/folder.model";
import { FolderService } from "../folder/folder.service";
import { CreateSignature } from "./dto/create-signature.dto";
import { FindSignature } from "./dto/find-signature.dto";
import { UpdateSignature } from "./dto/update-signature.dto";
import SigType from "./enums/sig-type.enum";
import { Signature } from "./signature.model";

@Injectable()
export class SignatureService {
  private readonly populateFields = ["connection", "folder"];

  constructor(
    @InjectModel(Signature.name) private signatureModel: Model<Signature>,
    private connectionService: ConnectionService,
    private folderService: FolderService,
  ) {}

  async findById(id: string): Promise<FindSignature> {
    return this.signatureModel.findById(id).populate(this.populateFields);
  }

  async findBySystem(
    systemName: string,
    folderId: string,
  ): Promise<FindSignature[]> {
    const folder = await this.folderService.getFolderById(folderId);
    return this.signatureModel
      .find({ folder, systemName })
      .populate(this.populateFields);
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
    folder: Folder,
    user?: User,
  ): Promise<Signature> {
    // Create new connection for wormholes.
    const connection =
      signature.type === SigType.WORMHOLE
        ? await this.connectionService.create(signature.connection)
        : null;

    try {
      const created = await this.signatureModel.create({
        ...signature,
        folder,
        connection,
        createdBy: user?.main.name || "",
      });
      return created;
    } catch (error) {
      // Connections will have been created by this point and must be removed if sig creation fails.
      await this.connectionService.delete(connection.id);
      throw error;
    }
  }

  async createSignatures(
    signatures: CreateSignature[],
    folderId: string,
    user?: User,
  ): Promise<Signature[]> {
    const folder = await this.folderService.getFolderById(folderId);
    return Promise.all(
      signatures.map((sig) => this.createSignature(sig, folder, user)),
    );
  }

  async update(update: UpdateSignature, folder: Folder) {
    const { id, connection: connectionUpdate, ...sigUpdate } = update;

    // Require folder ID to be correct for security.
    const signature = await this.signatureModel
      .findOne({ id, folder })
      .populate(this.populateFields);
    await this.signatureModel.findByIdAndUpdate(id, sigUpdate);

    // TODO: Update connection.

    return this.findById(id);
  }

  async updateSignatures(
    updates: UpdateSignature[],
    folderId: string,
  ): Promise<FindSignature[]> {
    const folder = await this.folderService.getFolderById(folderId);
    return Promise.all(updates.map((update) => this.update(update, folder)));
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
