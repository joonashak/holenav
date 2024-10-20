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

  async findBySystem(root: string): Promise<FindConnectionGraph> {
    const chains = await this.connectionModel.aggregate([
      { $match: { from: root } },
      {
        $graphLookup: {
          from: "connections",
          startWith: "$to",
          connectFromField: "to",
          connectToField: "from",
          as: "children",
          depthField: "depth",
          maxDepth: 100,
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

  /**
   * Mongo's default ID's (`_id`) need to be mapped manually to GraphQL `id`
   * fields because Mongoose does not apply the model to aggregate pipeline
   * results.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private addIdsToChain(chain: any) {
    return {
      ...chain,
      id: chain._id,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      children: chain.children.map((child: any) => ({
        ...child,
        id: child._id,
      })),
    };
  }
}
