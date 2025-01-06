import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Connection } from "./connection.model";
import { FindConnectionGraph } from "./dto/find-connection-graph.dto";

@Injectable()
export class ConnectionGraphService {
  constructor(
    @InjectModel(Connection.name) private connectionModel: Model<Connection>,
  ) {}

  async findBySystem(
    root: string,
    folderId: string,
  ): Promise<FindConnectionGraph> {
    const connections = await this.connectionModel.aggregate([
      // Start with connections from given root system.
      { $match: { from: root, folderId } },
      // Traverse the graph of all linked connections.
      {
        $graphLookup: {
          from: "connections",
          startWith: "$to",
          connectFromField: "to",
          connectToField: "from",
          as: "children",
          depthField: "depth",
          maxDepth: 100,
          restrictSearchWithMatch: { folderId },
        },
      },
      // Pick only the first document as they all have identical connection lists due to the graph being two-way.
      { $limit: 1 },
      // Promote the connection list to documents.
      { $unwind: { path: "$children" } },
      { $replaceRoot: { newRoot: "$children" } },
      // Add the related signature to each connection.
      {
        $lookup: {
          from: "signatures",
          localField: "_id",
          foreignField: "connection",
          as: "signature",
        },
      },
      { $set: { signature: { $first: "$signature" } } },
      // Copy IDs to match what Mongoose does automatically when not using aggregation pipelines.
      { $addFields: { id: "$_id", "signature.id": "$signature._id" } },
      // FIXME: This is not necessary after implementing reverse signatures.
      // Remove empty signatures.
      {
        $addFields: {
          signature: {
            $cond: {
              if: { $eq: ["$signature", {}] },
              then: "$$REMOVE",
              else: "$signature",
            },
          },
        },
      },
    ]);

    return {
      root,
      connections,
    };
  }
}
