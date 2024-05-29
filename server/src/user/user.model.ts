import { Field, ObjectType, registerEnumType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { v4 as uuid } from "uuid";
import { HolenavCharacter } from "../entities/character/character.model";
import { Credentials } from "./credentials/credentials.model";
import { FolderRole, FolderRoleSchema } from "./roles/folder-role.model";
import SystemRole from "./roles/system-role.enum";
import defaultUserSettings from "./settings/default-user-settings";
import {
  UserSettings,
  UserSettingsSchema,
} from "./settings/user-settings.model";

export type UserDocument = HolenavUser & mongoose.Document;

registerEnumType(SystemRole, { name: "SystemRoles" });

@ObjectType()
@Schema({ collection: "holenav-users" })
export class HolenavUser {
  @Field()
  @Prop({ default: uuid, unique: true })
  id: string;

  @Field((type) => HolenavCharacter)
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "HolenavCharacter",
    unique: true,
  })
  main: HolenavCharacter;

  @Field((type) => [HolenavCharacter])
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "HolenavCharacter" }],
  })
  alts: HolenavCharacter[];

  @Field((type) => [FolderRole])
  @Prop({ type: [FolderRoleSchema] })
  folderRoles: FolderRole[];

  @Field((type) => UserSettings)
  @Prop({ type: UserSettingsSchema, default: defaultUserSettings })
  settings: UserSettings;

  @Field((type) => SystemRole)
  @Prop({ default: SystemRole.NONE })
  systemRole: SystemRole;

  @Field((type) => Credentials)
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "Credentials",
    unique: true,
  })
  credentials?: Credentials;
}

export const UserSchema = SchemaFactory.createForClass(HolenavUser);
