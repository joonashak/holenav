import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ActiveFolder } from "../../auth/decorators/active-folder.decorator";
import { RequireFolderRole } from "../../auth/decorators/role.decorator";
import FolderRoles from "../../user/roles/folder-roles.enum";
import { FolderDocument } from "../folder/folder.model";
import AddWormholeInput from "./dto/add-wormhole.dto";
import { ConnectionTree } from "./dto/connection-tree.dto";
import UpdateWormholeInput from "./dto/update-wormhole.dto";
import { Wormhole } from "./wormhole.model";
import { WormholeService } from "./wormhole.service";

@Resolver()
export class WormholeResolver {
  constructor(private whService: WormholeService) {}

  @RequireFolderRole(FolderRoles.READ)
  @Query((returns) => ConnectionTree)
  async getConnectionTree(
    @Args("rootSystem") rootSystemName: string,
    @ActiveFolder() activeFolder: FolderDocument,
  ): Promise<ConnectionTree> {
    return this.whService.getConnectionTree(rootSystemName, activeFolder);
  }

  @RequireFolderRole(FolderRoles.READ)
  @Query((returns) => [Wormhole])
  async getWormholesBySystem(
    @Args("name") systemName: string,
    @ActiveFolder() activeFolder: FolderDocument,
  ): Promise<Wormhole[]> {
    return this.whService.getBySystem(systemName, activeFolder);
  }

  @RequireFolderRole(FolderRoles.WRITE)
  @Mutation((returns) => Wormhole)
  async addWormhole(
    @Args("input") input: AddWormholeInput,
    @ActiveFolder() folder: FolderDocument,
  ): Promise<Wormhole> {
    const res = await this.whService.createWormhole(input, folder);
    return res;
  }

  @RequireFolderRole(FolderRoles.WRITE)
  @Mutation((returns) => Wormhole)
  async updateWormhole(
    @Args("input") input: UpdateWormholeInput,
    @ActiveFolder() folder: FolderDocument,
  ): Promise<Wormhole> {
    const { id, ...update } = input;
    const res = await this.whService.updateWormhole(id, folder, update);
    return res;
  }

  @RequireFolderRole(FolderRoles.WRITE)
  @Mutation((returns) => Wormhole)
  async deleteWormhole(@Args("id") id: string): Promise<Wormhole> {
    return this.whService.deleteWormhole(id);
  }
}
