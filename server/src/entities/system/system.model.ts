import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { v4 as uuid } from "uuid";
import { Folder } from "../folder/folder.model";

export type SystemDocument = System & mongoose.Document;

// TODO: This model might be redundant. Investigate.
@ObjectType()
@Schema()
export class System {
  @Field()
  @Prop({ default: uuid, unique: true })
  id: string;

  @Field(() => String)
  @Prop()
  name: string;

  @Field((type) => Folder)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Folder" })
  folder: Folder;
}

export const SystemSchema = SchemaFactory.createForClass(System);
