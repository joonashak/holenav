import {
  CloneBayUserService,
  RequireAuthentication,
  UserId,
} from "@joonashak/nestjs-clone-bay";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateMapDto } from "./dto/create-map.dto";
import { FindMap } from "./dto/find-map.dto";
import { Map } from "./map.model";
import { MapService } from "./map.service";

@Resolver()
export class MapResolver {
  constructor(
    private mapService: MapService,
    private userService: CloneBayUserService,
  ) {}

  @RequireAuthentication()
  @Mutation(() => FindMap)
  async createMap(
    @Args("input") input: CreateMapDto,
    @UserId() userId: string,
  ): Promise<Map> {
    const user = await this.userService.findById(userId);
    return this.mapService.createMap(input, user);
  }

  @RequireAuthentication()
  @Query(() => [FindMap])
  async findMaps(@UserId() userId: string): Promise<Map[]> {
    const user = await this.userService.findById(userId);
    return this.mapService.findMapsForUser(user);
  }
}
