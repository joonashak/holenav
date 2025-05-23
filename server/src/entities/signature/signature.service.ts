import { User } from "@joonashak/nestjs-clone-bay";
import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Connection } from "../connection/connection.model";
import { ConnectionService } from "../connection/connection.service";
import MassStatus from "../connection/mass-status.enum";
import { Folder } from "../folder/folder.model";
import { FolderService } from "../folder/folder.service";
import { CreateSignature } from "./dto/create-signature.dto";
import { FindSignature } from "./dto/find-signature.dto";
import { UpdateSignature } from "./dto/update-signature.dto";
import SigType from "./enums/sig-type.enum";
import { Signature } from "./signature.model";
import { ReverseSignatureUpdate } from "./types";

@Injectable()
export class SignatureService {
  private readonly populateFields = [
    "folder",
    { path: "connection", populate: { path: "reverse" } },
  ];

  constructor(
    @InjectModel(Signature.name) private signatureModel: Model<Signature>,
    @Inject(forwardRef(() => ConnectionService))
    private connectionService: ConnectionService,
    private folderService: FolderService,
  ) {}

  async findById(id: string): Promise<FindSignature | null> {
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
      signature.type === SigType.WORMHOLE && signature.connection
        ? await this.connectionService.create(
            signature.connection,
            folder.id,
            user,
          )
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
      if (connection) {
        await this.connectionService.delete(connection.id);
      }
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

  async createReverseSignature(connection: Connection) {
    const folder = await this.folderService.getFolderById(connection.folderId);
    return this.signatureModel.create({
      connection,
      folder,
      systemName: connection.from,
      type: SigType.WORMHOLE,
      createdBy: connection.createdBy,
    });
  }

  async update(update: UpdateSignature, folder: Folder, user?: User) {
    const { id, connection: connectionUpdate, ...sigUpdate } = update;

    // Require folder ID to be correct for security.
    const signature = await this.signatureModel
      .findOne({ _id: id, folder })
      .populate(this.populateFields);

    if (!signature) {
      throw new NotFoundException();
    }

    await this.signatureModel.findByIdAndUpdate(signature.id, {
      ...sigUpdate,
      updatedBy: user?.main.name || "",
    });

    if (!signature.connection && connectionUpdate) {
      const connection = await this.connectionService.create(
        {
          to: null,
          type: null,
          k162: false,
          eol: false,
          massStatus: MassStatus.STABLE,
          ...connectionUpdate,
          from: signature.systemName,
        },
        folder.id,
        user,
      );
      await this.signatureModel.findByIdAndUpdate(signature.id, { connection });
    }

    if (signature.connection && connectionUpdate) {
      await this.connectionService.update(
        signature.connection.id,
        connectionUpdate,
        user,
      );
    }

    if (signature.connection && connectionUpdate === null) {
      await this.connectionService.delete(signature.connection.id);
      await this.signatureModel.findByIdAndUpdate(signature.id, {
        connection: null,
      });
    }

    return this.findById(signature.id);
  }

  async updateSignatures(
    updates: UpdateSignature[],
    folderId: string,
    user?: User,
  ): Promise<FindSignature[]> {
    const folder = await this.folderService.getFolderById(folderId);
    const updated = await Promise.all(
      updates.map((update) => this.update(update, folder, user)),
    );
    return updated.filter((res) => res !== null);
  }

  /**
   * Update signature associated with given `Connection`.
   *
   * Allows updating only `systemName`.
   */
  async updateReverseSignature({
    connection,
    systemName,
    user,
  }: ReverseSignatureUpdate) {
    return this.signatureModel.findOneAndUpdate(
      { connection },
      { systemName, updatedBy: user?.main.name },
    );
  }

  async delete(
    signatureId: string,
    folder: Folder,
  ): Promise<FindSignature | null> {
    // Require folder ID to be correct for security.
    const signature = await this.signatureModel
      .findOne({ _id: signatureId, folder })
      .populate("connection");

    if (!signature) {
      return null;
    }

    if (signature.connection) {
      await this.connectionService.delete(signature.connection.id);
    }

    return this.signatureModel.findByIdAndDelete(signature);
  }

  /**
   * Delete signatures and their connections.
   *
   * Safe to use for non-existent signatures.
   */
  async deleteSignatures(
    ids: string[],
    folderId: string,
  ): Promise<FindSignature[]> {
    const folder = await this.folderService.getFolderById(folderId);
    const results = await Promise.all(
      ids.map(async (id) => this.delete(id, folder)),
    );
    return results.filter((res) => res !== null);
  }

  async deleteByConnection(connection: Connection) {
    if (!connection) {
      throw new BadRequestException("Must provide Connection to delete by.");
    }
    return this.signatureModel.findOneAndDelete({ connection });
  }

  /**
   * Delete all signatures in given folder.
   *
   * Does not remove associated connections. Does not check for permissions.
   */
  async deleteByFolder(folderId: string) {
    const folder = await this.folderService.getFolderById(folderId);
    await this.signatureModel.deleteMany({ folder });
  }
}
