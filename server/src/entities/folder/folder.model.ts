import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { v4 as uuid } from "uuid";

export type FolderDocument = Folder & Document;

@ObjectType()
@Schema()
export class Folder {
  @Field()
  @Prop({ default: uuid, unique: true })
  id: string;

  @Field()
  @Prop()
  name: string;

  @Field()
  @Prop({ default: false })
  personal?: boolean;
}

export const FolderSchema = SchemaFactory.createForClass(Folder);
