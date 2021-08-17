import { Args, Query, Resolver } from "@nestjs/graphql";
import { System } from "./system.model";
import { SystemService } from "./system.service";

@Resolver((of) => System)
export class SystemResolver {
  constructor(private systemService: SystemService) {}

  @Query((returns) => [System])
  async systems() {
    return this.systemService.list();
  }

  @Query((returns) => System)
  async getSystemByName(@Args("name") name: string) {
    return this.systemService.getByName(name);
  }
}
