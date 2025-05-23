import { User } from "@joonashak/nestjs-clone-bay";
import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { randomUUID } from "crypto";
import { pick } from "lodash";
import { Model, UpdateQuery } from "mongoose";
import isUuid from "../../utils/isUuid";
import { SignatureService } from "../signature/signature.service";
import { computeEolAt } from "./compute-eol-at";
import { Connection, ConnectionDocument } from "./connection.model";
import { CreateConnection } from "./dto/create-connection.dto";
import { UpdateConnection } from "./dto/update-connection.dto";

/**
 * Main concern of this service is to maintain the two-way connection graph by
 * keeping two mirrored connections in sync for each wormhole. This enables use
 * of the `$graphLookup` aggregation stage to traverse the graph and build map
 * trees.
 *
 * This service also takes care of creating, updating, and deleting the
 * signature linked to the respective reverse connection. The reverse signature
 * is created even when the connection's destination is unknown. This is done to
 * keep things simple as we don't have to account for optionality and can just
 * assume the reverse signature always exists.
 */
@Injectable()
export class ConnectionService {
  /** Duplicate fields for reverse connections. */
  private readonly duplicateFieldKeys = [
    "massStatus",
    "eol",
    "eolAt",
    "type",
    "unknown",
    "folderId",
    "createdBy",
    "updatedBy",
  ];

  constructor(
    @InjectModel(Connection.name) private connectionModel: Model<Connection>,
    @Inject(forwardRef(() => SignatureService))
    private signatureService: SignatureService,
  ) {}

  /**
   * Find connection by ID.
   *
   * Throws if not found.
   */
  async findById(id: string): Promise<Connection> {
    const connection = await this.connectionModel.findById(id);

    if (!connection) {
      throw new NotFoundException(`Connection not found (${id}).`);
    }

    return connection;
  }

  /** Create `Connection` and its linked reverse `Connection`. */
  async create(
    connection: CreateConnection,
    folderId: string,
    user?: User,
  ): Promise<ConnectionDocument> {
    /**
     * Assigning random destination names to connections with unknown
     * destinations prevents $graphLookup from connecting all unknown
     * connections together.
     */
    const to = connection.to || randomUUID();
    const unknown = isUuid(to);
    const eolAt = computeEolAt(connection);

    const created = await this.connectionModel.create({
      ...connection,
      to,
      unknown,
      folderId,
      eolAt,
      createdBy: user?.main.name || "",
    });

    const duplicateFields = pick(created.toObject(), this.duplicateFieldKeys);

    const reverse = await this.connectionModel.create({
      ...duplicateFields,
      from: created.to,
      to: created.from,
      k162: created.type && !created.k162,
      reverse: created,
    });

    await this.signatureService.createReverseSignature(reverse);

    created.reverse = reverse;
    await created.save();
    return created.populate("reverse");
  }

  /**
   * Update connection and its linked pair.
   *
   * Note that updating `from` field is not supported.
   */
  async update(
    id: string,
    update: UpdateConnection,
    user?: User,
  ): Promise<Connection> {
    const current = await this.findById(id);
    const eolAt = computeEolAt(update, current);

    const query: UpdateQuery<Connection> = {
      ...update,
      eolAt,
      updatedBy: user?.main.name || "",
    };

    const revQuery: UpdateQuery<Connection> = pick(
      query,
      this.duplicateFieldKeys,
    );

    // Check for undefined to keep `to` field optional.
    if (update.to !== undefined) {
      query.to = update.to || randomUUID();
      query.unknown = isUuid(query.to);
      revQuery.from = query.to;
      revQuery.unknown = query.unknown;
    }

    // Check for undefined to keep `k162` field optional.
    if (update.k162 !== undefined) {
      revQuery.k162 = update.k162 !== null && !update.k162;
    }

    const connection = await this.connectionModel.findByIdAndUpdate(id, query);
    if (!connection) {
      throw new NotFoundException();
    }

    await this.connectionModel.findByIdAndUpdate(connection.reverse, revQuery);
    await this.signatureService.updateReverseSignature({
      connection: connection.reverse,
      systemName: revQuery.from,
      user,
    });

    const updated = await this.connectionModel
      .findById(connection)
      .populate("reverse");
    if (!updated) {
      throw new NotFoundException();
    }

    return updated;
  }

  /** Remove connection, its linked pair, and reverse signature. */
  async delete(id: string): Promise<void> {
    const connection = await this.connectionModel
      .findById(id)
      .populate("reverse");
    if (!connection) {
      throw new NotFoundException();
    }
    await this.connectionModel.findByIdAndDelete(connection.id);
    await this.connectionModel.findByIdAndDelete(connection.reverse.id);
    await this.signatureService.deleteByConnection(connection.reverse);
  }

  /**
   * Delete all connections in given folder.
   *
   * Does not remove associated signatures. Does not check for permissions.
   */
  async deleteByFolder(folderId: string) {
    await this.connectionModel.deleteMany({ folderId });
  }
}
