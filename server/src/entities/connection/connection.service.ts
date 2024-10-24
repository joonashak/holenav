import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { randomUUID } from "crypto";
import { pick } from "lodash";
import { Model } from "mongoose";
import { Connection, ConnectionDocument } from "./connection.model";
import { CreateConnection } from "./dto/create-connection.dto";

/**
 * Main concern of this service is to maintain the two-way connection graph by
 * keeping two mirrored connections in sync for each wormhole. This enables use
 * of the `$graphLookup` aggregation stage to traverse the graph and build map
 * trees.
 */
@Injectable()
export class ConnectionService {
  constructor(
    @InjectModel(Connection.name) private connectionModel: Model<Connection>,
  ) {}

  /** Create `Connection` and its linked reverse `Connection`. */
  async create(connection: CreateConnection): Promise<ConnectionDocument> {
    /**
     * Assigning random destination names to connections with unknown
     * destinations prevents $graphLookup from connecting all unknown
     * connections together.
     */
    const to = connection.to || randomUUID();
    const unknown = !connection.to;

    const created = await this.connectionModel.create({
      ...connection,
      to,
      unknown,
    });

    const duplicateFields = pick(created.toObject(), [
      "massStatus",
      "eol",
      "eolAt",
      "type",
      "unknown",
    ]);

    const reverse = await this.connectionModel.create({
      ...duplicateFields,
      from: created.to,
      to: created.from,
      k162: created.type && !created.k162,
      reverse: created,
    });

    created.reverse = reverse;
    await created.save();
    return created.populate("reverse");
  }

  /** Remove connection and its linked pair. */
  async delete(id: string): Promise<void> {
    const conn = await this.connectionModel.findById(id).populate("reverse");
    await this.connectionModel.findByIdAndDelete(conn.id);
    await this.connectionModel.findByIdAndDelete(conn.reverse.id);
  }
}
