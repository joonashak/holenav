import { Query, Resolver } from "@nestjs/graphql";
import { Wormhole } from "./wormhole.model";
import { WormholeService } from "./wormhole.service";

@Resolver()
export class WormholeResolver {
  constructor(private whService: WormholeService) {}

  @Query((returns) => Wormhole)
  async getConnectionTree() {
    // Jita
    const rootId = "6133e9bd849685002125725f";
    // Ikuchi
    // const rootId = "6133e9bd849685002125723a";
    // Otanuomi
    // const rootId = "6133e9bd849685002125689a";
    return this.whService.getConnectionTree(rootId);
  }
}
