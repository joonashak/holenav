import { Args, Query, Resolver } from "@nestjs/graphql";
import { ConnectionGraphService } from "./connection-graph.service";
import { FindConnectionGraph } from "./dto/find-connection-graph.dto";

@Resolver()
export class ConnectionGraphResolver {
  constructor(private connectionGraphService: ConnectionGraphService) {}

  @Query(() => FindConnectionGraph)
  async findConnectionGraph(
    @Args("root") root: string,
  ): Promise<FindConnectionGraph> {
    return this.connectionGraphService.findBySystem(root);
  }
}
