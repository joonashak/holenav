import { Field, ObjectType, registerEnumType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Folder } from "../entities/folder/folder.model";
import Roles from "./roles.enum";

export type RoleDocument = Role & mongoose.Document;

registerEnumType(Roles, { name: "Roles" });

@ObjectType()
@Schema()
export class Role {
  @Field((type) => Roles)
  @Prop()
  role: Roles;

  @Field((type) => Folder)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Folder" })
  folder: Folder;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
