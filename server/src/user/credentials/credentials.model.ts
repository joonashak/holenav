import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

export type CredentialsDocument = Credentials & mongoose.Document;

/**
 * Login credentials.
 *
 * Used for local authentication, which itself is mainly a backup for when
 * EVE SSO is down. Credentials are stored in a different collection in part to make
 * accidentally leaking them harder, but also to make use of database-level unique
 * attribute for username (since setting credentials is not mandatory).
 */
@ObjectType()
@Schema()
export class Credentials {
  @Field()
  @Prop({ unique: true })
  username: string;

  @Field()
  @Prop()
  passwordHash: string;
}

export const CredentialsSchema = SchemaFactory.createForClass(Credentials);
