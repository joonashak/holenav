import { Field, ObjectType, registerEnumType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Folder } from "../../entities/folder/folder.model";
import FolderRoles from "./folder-roles.enum";

registerEnumType(FolderRoles, { name: "FolderRoles" });

@ObjectType()
@Schema()
export class FolderRole {
  @Field((type) => FolderRoles)
  @Prop({ type: FolderRoles })
  role: FolderRoles;

  @Field((type) => Folder)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Folder" })
  folder: Folder;
}

export const FolderRoleSchema = SchemaFactory.createForClass(FolderRole);
