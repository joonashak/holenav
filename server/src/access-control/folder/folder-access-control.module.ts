import { CloneBayUserService } from "@joonashak/nestjs-clone-bay";
import { CacheModule } from "@nestjs/cache-manager";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { FolderAbilityFactory } from "./folder-ability.factory";
import { FolderRole, FolderRoleSchema } from "./folder-role.model";
import { FolderRoleResolver } from "./folder-role.resolver";
import { FolderRoleService } from "./folder-role.service";
import { FolderAccessControl } from "./folder.access-control";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FolderRole.name, schema: FolderRoleSchema },
    ]),
    CacheModule.register({ ttl: 5000 }),
  ],
  providers: [
    FolderAccessControl,
    FolderAbilityFactory,
    CloneBayUserService,
    FolderRoleService,
    FolderRoleResolver,
  ],
  exports: [MongooseModule, FolderAccessControl],
})
export class FolderAccessControlModule {}
