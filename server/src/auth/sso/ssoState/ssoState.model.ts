import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type SsoStateDocument = SsoState & Document;

@ObjectType()
@Schema()
export class SsoState {
  @Field()
  @Prop({ unique: true })
  value: string;

  @Field()
  @Prop()
  expiry: Date;
}

export const SsoStateSchema = SchemaFactory.createForClass(SsoState);
