import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ActiveFolder } from "../../auth/decorators/active-folder.decorator";
import { RequireFolderRole } from "../../auth/decorators/role.decorator";
import FolderRole from "../../user/roles/folder-role.enum";
import { FolderDocument } from "../folder/folder.model";
import { ConnectionTreeService } from "./connection-tree.service";
import { AddWormholeInput } from "./dto/add-wormhole.dto";
import { ConnectionTree } from "./dto/connection-tree.dto";
import UpdateWormholeInput from "./dto/update-wormhole.dto";
import { Wormhole } from "./wormhole.model";
import { WormholeService } from "./wormhole.service";

@Resolver()
export class WormholeResolver {
  constructor(
    private whService: WormholeService,
    private connectionTreeService: ConnectionTreeService,
  ) {}

  @RequireFolderRole(FolderRole.READ)
  @Query((returns) => ConnectionTree)
  async getConnectionTree(
    @Args("rootSystem") rootSystemName: string,
    @ActiveFolder() activeFolder: FolderDocument,
  ): Promise<ConnectionTree> {
    return this.connectionTreeService.getConnectionTree(rootSystemName, activeFolder);
  }

  @RequireFolderRole(FolderRole.READ)
  @Query((returns) => [Wormhole])
  async getWormholesBySystem(
    @Args("name") systemName: string,
    @ActiveFolder() activeFolder: FolderDocument,
  ): Promise<Wormhole[]> {
    return this.whService.getBySystem(systemName, activeFolder);
  }

  @RequireFolderRole(FolderRole.WRITE)
  @Mutation((returns) => [Wormhole])
  async addWormholes(
    @Args("input") input: AddWormholeInput,
    @ActiveFolder() folder: FolderDocument,
  ): Promise<Wormhole[]> {
    const res = await this.whService.createWormholes(input.wormholes, folder);
    return res;
  }

  @RequireFolderRole(FolderRole.WRITE)
  @Mutation((returns) => Wormhole)
  async updateWormhole(
    @Args("input") input: UpdateWormholeInput,
    @ActiveFolder() folder: FolderDocument,
  ): Promise<Wormhole> {
    const { id, ...update } = input;
    const res = await this.whService.updateWormhole(id, folder, update);
    return res;
  }

  @RequireFolderRole(FolderRole.WRITE)
  @Mutation((returns) => Wormhole)
  async deleteWormhole(@Args("id") id: string): Promise<Wormhole> {
    return this.whService.deleteWormhole(id);
  }
}
