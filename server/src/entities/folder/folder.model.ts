import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { randomUUID } from "crypto";
import { Document } from "mongoose";

export type FolderDocument = Folder & Document;

@ObjectType()
@Schema()
export class Folder {
  @Field()
  @Prop({ default: randomUUID, unique: true, index: true })
  id: string;

  @Field()
  @Prop()
  name: string;
}

export const FolderSchema = SchemaFactory.createForClass(Folder);
