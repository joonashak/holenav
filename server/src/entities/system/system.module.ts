import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { System, SystemSchema } from "./system.model";
import { SystemService } from "./system.service";
import { SystemResolver } from "./system.resolver";
import { UserService } from "../../user/user.service";
import { RoleService } from "../../role/role.service";
import { JwtModule } from "@nestjs/jwt";
import { UserModule } from "../../user/user.module";
import { RoleModule } from "../../role/role.module";
import { FolderService } from "../folder/folder.service";
import { FolderModule } from "../folder/folder.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: System.name, schema: SystemSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
    UserModule,
    RoleModule,
    FolderModule,
  ],
  providers: [SystemService, SystemResolver, UserService, RoleService, FolderService],
  exports: [SystemService, MongooseModule],
})
export class SystemModule {}
