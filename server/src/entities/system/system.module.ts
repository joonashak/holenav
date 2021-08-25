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

@Module({
  imports: [
    UserModule,
    RoleModule,
    MongooseModule.forFeature([{ name: System.name, schema: SystemSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  providers: [SystemService, SystemResolver, UserService, RoleService],
  exports: [SystemService, MongooseModule],
})
export class SystemModule {}
