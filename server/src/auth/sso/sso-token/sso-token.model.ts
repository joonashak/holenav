import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@ObjectType()
@Schema({ collection: "sso-tokens" })
export class SsoToken {
  @Field()
  @Prop()
  accessToken: string;

  @Field()
  @Prop()
  refreshToken: string;
}

export type SsoTokenDocument = SsoToken & mongoose.Document;
export const SsoTokenSchema = SchemaFactory.createForClass(SsoToken);
