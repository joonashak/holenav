import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { v4 as uuid } from "uuid";
import { Folder } from "../folder/folder.model";
import { Signature } from "../signature/signature.model";
import { MapTreeNode } from "./dto/system.dto";

export type SystemDocument = System & mongoose.Document;

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

  @Field((type) => [Signature])
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Signature" }] })
  signatures: Signature[];

  @Field((type) => MapTreeNode)
  mapTree?: MapTreeNode;
}

export const SystemSchema = SchemaFactory.createForClass(System);
