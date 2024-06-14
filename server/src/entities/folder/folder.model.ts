import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type FolderDocument = Folder & Document;

@ObjectType()
@Schema()
export class Folder {
  @Field()
  id: string;

  @Field()
  @Prop()
  name: string;

  @Field()
  @Prop({ default: false })
  personal?: boolean;
}

export const FolderSchema = SchemaFactory.createForClass(Folder);
