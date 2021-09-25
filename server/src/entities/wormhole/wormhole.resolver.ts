import { Query, Resolver } from "@nestjs/graphql";
import { ConnectionTree } from "./dto/connectionTree.dto";
import { WormholeService } from "./wormhole.service";

@Resolver()
export class WormholeResolver {
  constructor(private whService: WormholeService) {}

  @Query((returns) => ConnectionTree)
  async getConnectionTree(): Promise<ConnectionTree> {
    return this.whService.getConnectionTree("Jita");
  }
}
