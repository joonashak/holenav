import { Field, ObjectType, registerEnumType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { Connection } from "../connection/connection.model";
import { Folder } from "../folder/folder.model";
import SigType from "./enums/sig-type.enum";

registerEnumType(SigType, { name: "SigType" });

@ObjectType()
@Schema({ timestamps: true, validateBeforeSave: true })
export class Signature {
  @Field()
  id: string;

  @Field()
  @Prop({ required: true })
  eveId: string;

  @Field(() => SigType)
  @Prop({ required: true })
  type: SigType;

  @Field()
  @Prop({ default: "" })
  name: string;

  @Field()
  @Prop({ required: true })
  systemName: string;

  @Field(() => Connection, { nullable: true })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Connection.name })
  connection: Connection | null;

  @Field(() => Folder)
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Folder.name,
    index: true,
    required: true,
  })
  folder: Folder;

  @Field(() => Date)
  @Prop({ default: Date.now })
  createdAt: Date;

  @Field({ defaultValue: "" })
  @Prop()
  createdBy: string;

  @Field(() => Date)
  @Prop({ default: Date.now })
  updatedAt: Date;

  @Field({ defaultValue: "" })
  @Prop()
  updatedBy: string;
}

export const SignatureSchema = SchemaFactory.createForClass(Signature);
export type SignatureDocument = Signature & Document;
