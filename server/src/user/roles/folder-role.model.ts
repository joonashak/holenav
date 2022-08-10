import { Field, ObjectType, registerEnumType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Folder } from "../../entities/folder/folder.model";
import FolderRoleEnum from "./folder-role.enum";

registerEnumType(FolderRoleEnum, { name: "FolderRoles" });

@ObjectType()
@Schema()
export class FolderRole {
  @Field((type) => FolderRoleEnum)
  @Prop({ type: FolderRoleEnum })
  role: FolderRoleEnum;

  @Field((type) => Folder)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Folder" })
  folder: Folder;
}

export const FolderRoleSchema = SchemaFactory.createForClass(FolderRole);
