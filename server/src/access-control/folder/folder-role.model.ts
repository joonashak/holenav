import { Field, ObjectType, registerEnumType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { FolderAction } from "./folder-action.enum";

registerEnumType(FolderAction, { name: "FolderAction" });

@ObjectType()
@Schema({ collection: "folder-roles" })
export class FolderRole {
  @Field()
  @Prop({ index: true })
  folderId: string;

  @Field(() => FolderAction)
  @Prop()
  action: FolderAction;

  @Field({ nullable: true })
  @Prop()
  userId: string | null;

  // @Field()
  // @Prop()
  // corporationId: string;

  // @Field()
  // @Prop()
  // allianceId: string;
}

export const FolderRoleSchema = SchemaFactory.createForClass(FolderRole);

export type FolderRoleDocument = FolderRole & Document;
