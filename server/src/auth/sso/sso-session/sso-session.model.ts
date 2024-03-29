import { Field, ObjectType, registerEnumType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { Character } from "../../../entities/character/character.model";
import { User } from "../../../user/user.model";
import SsoSessionType from "./sso-session-type.enum";

export type SsoSessionDocument = SsoSession & mongoose.Document;

registerEnumType(SsoSessionType, { name: "SsoSessionTypes" });

/**
 * SSO Session implements a verifiable state between the client and server
 * while the SSO authentication is being negotiated between the client and the
 * SSO server (EVE/CCP).
 */
@ObjectType()
@Schema({ collection: "sso-sessions" })
export class SsoSession {
  @Field()
  @Prop({ unique: true })
  key: string;

  @Field((type) => SsoSessionType)
  @Prop()
  type: SsoSessionType;

  @Field()
  @Prop()
  expiry: Date;

  @Field()
  @Prop({ default: false })
  ssoLoginSuccess: boolean;

  @Field((type) => Character)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Character" })
  character: Character;

  @Field((type) => User)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
  user: User;
}

export const SsoSessionSchema = SchemaFactory.createForClass(SsoSession);
