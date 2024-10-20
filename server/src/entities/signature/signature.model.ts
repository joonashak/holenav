import { Field, ObjectType, registerEnumType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { Connection } from "../connection/connection.model";
import SigType from "./enums/sig-type.enum";

registerEnumType(SigType, { name: "SigType" });

@ObjectType()
@Schema({ timestamps: true })
export class Signature {
  @Field()
  id: string;

  @Field()
  @Prop()
  eveId: string;

  @Field(() => SigType)
  @Prop()
  type: SigType;

  @Field()
  @Prop()
  name: string;

  @Field()
  @Prop()
  systemName: string;

  @Field(() => Connection, { nullable: true })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Connection.name })
  connection: Connection | null;

  @Field(() => Date)
  @Prop({ default: Date.now })
  createdAt: Date;

  @Field()
  @Prop()
  createdBy: string;

  @Field(() => Date)
  @Prop({ default: Date.now })
  updatedAt: Date;

  @Field()
  @Prop()
  updatedBy: string;
}

export const SignatureSchema = SchemaFactory.createForClass(Signature);
export type SignatureDocument = Signature & Document;
