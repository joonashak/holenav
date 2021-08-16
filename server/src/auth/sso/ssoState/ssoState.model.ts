import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type SsoStateDocument = SsoState & Document;

@ObjectType()
@Schema({ collection: "ssoStates" })
export class SsoState {
  @Field()
  @Prop({ unique: true })
  value: string;

  @Field()
  @Prop()
  expiry: Date;

  @Field()
  @Prop({ default: false })
  ssoLoginSuccess: boolean;
}

export const SsoStateSchema = SchemaFactory.createForClass(SsoState);
