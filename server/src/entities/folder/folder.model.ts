import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { v4 as uuid } from "uuid";
import { System } from "../system/system.model";

export type FolderDocument = Folder & mongoose.Document;

@ObjectType()
@Schema()
export class Folder {
  @Field()
  @Prop({ default: uuid, unique: true })
  id: string;

  @Field()
  @Prop()
  name: string;

  @Field((type) => [System])
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "System" }] })
  roles: System[];
}

export const FolderSchema = SchemaFactory.createForClass(Folder);
