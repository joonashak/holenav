import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Folder } from "../folder/folder.model";

export type SystemDocument = System & mongoose.Document;

@ObjectType()
@Schema()
export class System {
  @Field(() => String)
  @Prop()
  name: string;

  @Field((type) => Folder)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Folder" })
  folder: Folder;
}

export const SystemSchema = SchemaFactory.createForClass(System);
