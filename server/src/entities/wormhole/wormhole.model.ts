import { Field, ObjectType, registerEnumType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { v4 as uuid } from "uuid";
import { Folder } from "../folder/folder.model";
import MassStatus from "./massStatus.enum";

export type WormholeDocument = Wormhole & mongoose.Document;

registerEnumType(MassStatus, { name: "MassStatus" });

@ObjectType()
@Schema()
export class Wormhole {
  @Field()
  @Prop({ default: uuid, unique: true })
  id?: string;

  @Field({ nullable: true })
  @Prop()
  eveId?: string;

  @Field({ nullable: true })
  @Prop()
  name?: string;

  @Field({ nullable: true })
  @Prop()
  type?: string;

  @Field()
  @Prop({ default: false })
  eol?: boolean;

  @Field((type) => MassStatus)
  @Prop({ default: MassStatus.STABLE })
  massStatus?: MassStatus;

  @Field((type) => Folder)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Folder" })
  folder: Folder;

  @Field()
  @Prop()
  systemName: string;

  @Field({ nullable: true })
  @Prop()
  destinationName?: string;

  @Field((type) => Wormhole, { nullable: true })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Wormhole", nullable: true })
  reverse?: Wormhole;

  @Field({ nullable: true })
  @Prop()
  reverseType?: string;
}

export const WormholeSchema = SchemaFactory.createForClass(Wormhole);
