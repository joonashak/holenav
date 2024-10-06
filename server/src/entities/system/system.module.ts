import { Module } from "@nestjs/common";
import { FolderAccessControlModule } from "../../access-control/folder/folder-access-control.module";
import { SystemResolver } from "./system.resolver";

@Module({
  imports: [FolderAccessControlModule],
  providers: [SystemResolver],
})
export class SystemModule {}
