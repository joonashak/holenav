import { Query, Resolver } from "@nestjs/graphql";
import { Wormhole } from "./wormhole.model";
import { WormholeService } from "./wormhole.service";

@Resolver()
export class WormholeResolver {
  constructor(private whService: WormholeService) {}

  @Query((returns) => Wormhole)
  async getConnectionTree() {
    return this.whService.getConnectionTree("Jita");
  }
}
