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
    const chains = await this.connectionModel.aggregate([
      { $match: { from: root, folderId } },
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
    ]);

    const connections = chains.length
      ? chains[0].children.map((conn) => ({ ...conn, id: conn._id }))
      : [];

    return {
      root,
      connections,
    };
  }
}
