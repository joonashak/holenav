import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
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
    const created = await this.connectionModel.create(connection);

    const duplicateFields = pick(created.toObject(), [
      "massStatus",
      "eol",
      "eolAt",
      "type",
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
}
