import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { v4 as uuid } from "uuid";
import { Folder } from "../folder/folder.model";
import { System } from "../system/system.model";

export type WormholeDocument = Wormhole & mongoose.Document;

@ObjectType()
@Schema()
export class Wormhole {
  @Field()
  @Prop({ default: uuid, unique: true })
  id?: string;

  @Field()
  @Prop({ nullable: true })
  eveId?: string;

  @Field()
  @Prop()
  name: string;

  @Field()
  @Prop()
  type: string;

  @Field()
  @Prop({ default: false })
  eol: boolean;

  @Field()
  @Prop()
  massStatus: string;

  @Field((type) => Folder)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Folder" })
  folder: Folder;

  @Field((type) => System)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "System" })
  system: System;

  @Field((type) => System)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "System", nullable: true })
  destination?: System;

  @Field((type) => Wormhole)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Wormhole", nullable: true })
  reverse?: Wormhole;
}

export const WormholeSchema = SchemaFactory.createForClass(Wormhole);
