import { CloneBayUserService } from "@joonashak/nestjs-clone-bay";
import { Module } from "@nestjs/common";
import { FolderAbilityFactory } from "./folder-ability.factory";
import { FolderAccessControl } from "./folder.access-control";

@Module({
  providers: [FolderAccessControl, FolderAbilityFactory, CloneBayUserService],
  exports: [FolderAccessControl],
})
export class FolderAccessControlModule {}
