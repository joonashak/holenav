import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { FolderModule } from "../entities/folder/folder.module";
import { FolderService } from "../entities/folder/folder.service";
import { RoleModule } from "../role/role.module";
import { RoleService } from "../role/role.service";
import { User, UserSchema } from "./user.model";
import { UserService } from "./user.service";
import { UserResolver } from "./user.resolver";
import { JwtModule } from "@nestjs/jwt";
import { jwtSecret } from "../config";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: jwtSecret,
    }),
    FolderModule,
    RoleModule,
  ],
  providers: [UserService, RoleService, FolderService, UserResolver],
  exports: [UserService, MongooseModule],
})
export class UserModule {}
