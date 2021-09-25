import { Args, Query, Resolver } from "@nestjs/graphql";
import { ConnectionTree } from "./dto/connectionTree.dto";
import { WormholeService } from "./wormhole.service";

@Resolver()
export class WormholeResolver {
  constructor(private whService: WormholeService) {}

  @Query((returns) => ConnectionTree)
  async getConnectionTree(
    @Args("rootSystem") rootSystemName: string,
    @Args("folderId") folderId: string,
  ): Promise<ConnectionTree> {
    return this.whService.getConnectionTree(rootSystemName, folderId);
  }
}
