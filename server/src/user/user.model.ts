import { Field, ObjectType, registerEnumType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { v4 as uuid } from "uuid";
import { Character } from "../entities/character/character.model";
import { Folder } from "../entities/folder/folder.model";
import { Role } from "../role/role.model";
import { FolderRole, FolderRoleSchema } from "./roles/folderRole.model";
import defaultUserSettings from "./settings/defaultUserSettings";
import { UserSettings, UserSettingsSchema } from "./settings/userSettings.model";
import SystemRoles from "./roles/systemRoles.enum";

export type UserDocument = User & mongoose.Document;

registerEnumType(SystemRoles, { name: "SystemRoles" });

@ObjectType()
@Schema()
export class User {
  @Field()
  @Prop({ default: uuid, unique: true })
  id: string;

  @Field((type) => [String])
  @Prop({ type: [String], select: false })
  tokens: string[];

  @Field((type) => Character)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Character", unique: true })
  main: Character;

  @Field((type) => [Character])
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Character" }] })
  alts: Character[];

  @Field((type) => [Role])
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Role" }] })
  roles: Role[];

  @Field((type) => [FolderRole])
  @Prop({ type: [FolderRoleSchema] })
  folderRoles: FolderRole[];

  @Field((type) => Folder)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Folder" })
  activeFolder: Folder;

  @Field((type) => UserSettings)
  @Prop({ type: UserSettingsSchema, default: defaultUserSettings })
  settings: UserSettings;

  @Field((type) => SystemRoles)
  @Prop({ default: SystemRoles.USER })
  systemRole: SystemRoles;
}

export const UserSchema = SchemaFactory.createForClass(User);
