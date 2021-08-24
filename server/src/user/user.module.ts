import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Role, RoleSchema } from "../role/role.model";
import { RoleService } from "../role/role.service";
import { User, UserSchema } from "./user.model";
import { UserService } from "./user.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Role.name, schema: RoleSchema },
    ]),
  ],
  providers: [UserService, RoleService],
})
export class UserModule {}
