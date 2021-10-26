import { Field, ObjectType, registerEnumType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { v4 as uuid } from "uuid";
import { System } from "../system/system.model";
import SigTypes from "./sigTypes.enum";

export type SignatureDocument = Signature & mongoose.Document;

registerEnumType(SigTypes, { name: "SigTypes" });

@ObjectType()
@Schema()
export class Signature {
  @Field()
  @Prop({ default: uuid, unique: true })
  id?: string;

  @Field()
  @Prop({ nullable: true })
  eveId?: string;

  @Field((type) => SigTypes)
  @Prop()
  type: SigTypes;

  @Field()
  @Prop()
  name: string;
}

export const SignatureSchema = SchemaFactory.createForClass(Signature);
