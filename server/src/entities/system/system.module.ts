import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { System, SystemSchema } from "./system.model";
import { SystemService } from "./system.service";
import { SystemResolver } from "./system.resolver";
import { UserService } from "../../user/user.service";
import { User, UserSchema } from "../../user/user.model";
import { RoleService } from "../../role/role.service";
import { Role, RoleSchema } from "../../role/role.model";
import { JwtModule, JwtService } from "@nestjs/jwt";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: System.name, schema: SystemSchema },
      { name: User.name, schema: UserSchema },
      { name: Role.name, schema: RoleSchema },
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  providers: [SystemService, SystemResolver, UserService, RoleService],
})
export class SystemModule {}
