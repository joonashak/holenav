import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ActiveFolder } from "../../auth/decorators/activeFolder.decorator";
import { RequireFolderRole } from "../../auth/decorators/role.decorator";
import Roles from "../../role/roles.enum";
import { FolderDocument } from "../folder/folder.model";
import AddWormholeInput from "./dto/addWormhole.dto";
import { ConnectionTree } from "./dto/connectionTree.dto";
import UpdateWormholeInput from "./dto/updateWormhole.dto";
import { Wormhole } from "./wormhole.model";
import { WormholeService } from "./wormhole.service";

@Resolver()
export class WormholeResolver {
  constructor(private whService: WormholeService) {}

  @RequireFolderRole(Roles.READ)
  @Query((returns) => ConnectionTree)
  async getConnectionTree(
    @Args("rootSystem") rootSystemName: string,
    @ActiveFolder() activeFolder: FolderDocument,
  ): Promise<ConnectionTree> {
    return this.whService.getConnectionTree(rootSystemName, activeFolder);
  }

  @RequireFolderRole(Roles.READ)
  @Query((returns) => [Wormhole])
  async getWormholesBySystem(
    @Args("name") systemName: string,
    @ActiveFolder() activeFolder: FolderDocument,
  ): Promise<Wormhole[]> {
    return this.whService.getBySystem(systemName, activeFolder);
  }

  @RequireFolderRole(Roles.WRITE)
  @Mutation((returns) => Wormhole)
  async addWormhole(
    @Args("input") input: AddWormholeInput,
    @ActiveFolder() folder: FolderDocument,
  ): Promise<Wormhole> {
    const res = await this.whService.createWormhole(input, folder);
    return res;
  }

  @RequireFolderRole(Roles.WRITE)
  @Mutation((returns) => Wormhole)
  async updateWormhole(
    @Args("input") input: UpdateWormholeInput,
    @ActiveFolder() folder: FolderDocument,
  ): Promise<Wormhole> {
    const { id, ...update } = input;
    const res = await this.whService.updateWormhole(id, folder, update);
    return res;
  }
}
