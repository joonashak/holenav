import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { RoleModule } from "../role/role.module";
import { RoleService } from "../role/role.service";
import { User, UserSchema } from "./user.model";
import { UserService } from "./user.service";

@Module({
  imports: [RoleModule, MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [UserService, RoleService],
  exports: [UserService, MongooseModule],
})
export class UserModule {}
