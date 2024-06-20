import { CloneBayUserService } from "@joonashak/nestjs-clone-bay";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { FolderAbilityFactory } from "./folder-ability.factory";
import { FolderRole, FolderRoleSchema } from "./folder-role.model";
import { FolderAccessControl } from "./folder.access-control";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FolderRole.name, schema: FolderRoleSchema },
    ]),
  ],
  providers: [FolderAccessControl, FolderAbilityFactory, CloneBayUserService],
  exports: [MongooseModule, FolderAccessControl],
})
export class FolderAccessControlModule {}
