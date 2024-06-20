import { User } from "@joonashak/nestjs-clone-bay";
import { registerEnumType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { Folder } from "../../entities/folder/folder.model";
import { FolderAction } from "./folder-action.enum";

registerEnumType(FolderAction, { name: "FolderAction" });

@Schema({ collection: "folder-roles" })
export class FolderRole {
  @Prop()
  action: FolderAction;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name, index: true })
  user: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Folder.name, index: true })
  folder: Folder;
}

export const FolderRoleSchema = SchemaFactory.createForClass(FolderRole);

export type FolderRoleDocument = FolderRole & Document;
