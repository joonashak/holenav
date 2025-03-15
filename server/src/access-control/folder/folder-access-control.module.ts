import { CloneBayModule } from "@joonashak/nestjs-clone-bay";
import { CacheModule } from "@nestjs/cache-manager";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { FolderAbilityFactory } from "./folder-ability.factory";
import { FolderRole, FolderRoleSchema } from "./folder-role/folder-role.model";
import { FolderRoleResolver } from "./folder-role/folder-role.resolver";
import { FolderRoleService } from "./folder-role/folder-role.service";
import { FolderAccessControl } from "./folder.access-control";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FolderRole.name, schema: FolderRoleSchema },
    ]),
    CacheModule.register({ ttl: 1000 * 60 }),
    CloneBayModule.forChildren(),
  ],
  providers: [
    FolderAccessControl,
    FolderAbilityFactory,
    FolderRoleService,
    FolderRoleResolver,
  ],
  exports: [MongooseModule, FolderAccessControl, FolderRoleService],
})
export class FolderAccessControlModule {}
