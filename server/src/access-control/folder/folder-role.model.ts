import { User } from "@joonashak/nestjs-clone-bay";
import { Field, ObjectType, registerEnumType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { FolderAction } from "./folder-action.enum";

registerEnumType(FolderAction, { name: "FolderAction" });

@ObjectType()
@Schema({ collection: "folder-roles" })
export class FolderRole {
  @Field(() => FolderAction)
  @Prop()
  action: FolderAction;

  @Field(() => User)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name, index: true })
  user: User;

  @Field(() => String)
  @Prop({ type: String, index: true })
  folderId: string;
}

export const FolderRoleSchema = SchemaFactory.createForClass(FolderRole);

export type FolderRoleDocument = FolderRole & Document;
