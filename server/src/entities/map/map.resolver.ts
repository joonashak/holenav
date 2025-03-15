import {
  CurrentUser,
  RequireAuthentication,
  User,
} from "@joonashak/nestjs-clone-bay";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateMapDto } from "./dto/create-map.dto";
import { FindMap } from "./dto/find-map.dto";
import { UpdateMapDto } from "./dto/update-map.dto";
import { Map } from "./map.model";
import { MapService } from "./map.service";

@Resolver()
export class MapResolver {
  constructor(private mapService: MapService) {}

  @RequireAuthentication()
  @Mutation(() => FindMap)
  async createMap(
    @Args("input") input: CreateMapDto,
    @CurrentUser() user: User,
  ): Promise<Map> {
    return this.mapService.createMap(input, user);
  }

  @RequireAuthentication()
  @Query(() => [FindMap])
  async findMaps(@CurrentUser() user: User): Promise<Map[]> {
    return this.mapService.findMapsForUser(user);
  }

  @RequireAuthentication()
  @Mutation(() => FindMap)
  async updateMap(
    @Args("update") update: UpdateMapDto,
    @CurrentUser() user: User,
  ): Promise<Map> {
    return this.mapService.updateMap(update, user);
  }

  @RequireAuthentication()
  @Mutation(() => String)
  async removeMap(
    @Args("id") mapId: string,
    @CurrentUser() user: User,
  ): Promise<string> {
    await this.mapService.removeMap(mapId, user);
    return "OK";
  }
}
