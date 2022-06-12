import { Field, ObjectType, registerEnumType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { v4 as uuid } from "uuid";
import { Character } from "../entities/character/character.model";
import { FolderRole, FolderRoleSchema } from "./roles/folder-role.model";
import defaultUserSettings from "./settings/default-user-settings";
import { UserSettings, UserSettingsSchema } from "./settings/user-settings.model";
import SystemRoles from "./roles/system-roles.enum";
import { Credentials } from "./credentials/credentials.model";

export type UserDocument = User & mongoose.Document;

registerEnumType(SystemRoles, { name: "SystemRoles" });

@ObjectType()
@Schema()
export class User {
  @Field()
  @Prop({ default: uuid, unique: true })
  id: string;

  @Field((type) => Character)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Character", unique: true })
  main: Character;

  @Field((type) => [Character])
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Character" }] })
  alts: Character[];

  @Field((type) => [FolderRole])
  @Prop({ type: [FolderRoleSchema] })
  folderRoles: FolderRole[];

  @Field((type) => UserSettings)
  @Prop({ type: UserSettingsSchema, default: defaultUserSettings })
  settings: UserSettings;

  @Field((type) => SystemRoles)
  @Prop({ default: SystemRoles.USER })
  systemRole: SystemRoles;

  @Field((type) => Credentials)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Credentials", unique: true })
  credentials?: Credentials;
}

export const UserSchema = SchemaFactory.createForClass(User);
