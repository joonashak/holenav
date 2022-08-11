import { Field, ObjectType, registerEnumType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { v4 as uuid } from "uuid";
import { Folder } from "../folder/folder.model";
import MassStatus from "../wormhole/mass-status.enum";
import SigType from "./sig-type.enum";

export type SignatureDocument = Signature & mongoose.Document;

registerEnumType(SigType, { name: "SigType" });
registerEnumType(MassStatus, { name: "MassStatus" });

@ObjectType()
@Schema()
export class Signature {
  @Field()
  @Prop({ default: uuid, unique: true })
  id?: string;

  @Field()
  @Prop({ nullable: true })
  eveId?: string;

  @Field((type) => SigType)
  @Prop()
  type: SigType;

  @Field()
  @Prop()
  name: string;

  @Field((type) => Folder)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Folder" })
  folder: Folder;

  @Field()
  @Prop()
  systemName: string;

  /*
    Wormhole-only props:
  */

  @Field({ nullable: true })
  @Prop()
  wormholeType?: string;

  @Field()
  @Prop({ default: false })
  eol?: boolean;

  @Field((type) => MassStatus)
  @Prop({ default: MassStatus.STABLE })
  massStatus?: MassStatus;

  @Field({ nullable: true })
  @Prop()
  destinationName?: string;

  @Field((type) => Signature, { nullable: true })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Signature", nullable: true })
  reverse?: Signature;

  @Field({ nullable: true })
  @Prop()
  reverseType?: string;
}

export const SignatureSchema = SchemaFactory.createForClass(Signature);
