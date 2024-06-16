import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Role, RoleSchema } from "./role/role.model";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),
  ],
  exports: [MongooseModule],
})
export class AccessControlModule {}
