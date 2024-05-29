import { Field, ObjectType, registerEnumType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { HolenavCharacter } from "../../../entities/character/character.model";
import { HolenavUser } from "../../../user/user.model";
import SsoSessionType from "./sso-session-type.enum";

export type SsoSessionDocument = SsoSession & mongoose.Document;

registerEnumType(SsoSessionType, { name: "SsoSessionTypes" });

/**
 * SSO Session implements a verifiable state between the client and server while
 * the SSO authentication is being negotiated between the client and the SSO
 * server (EVE/CCP).
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

  @Field((type) => HolenavCharacter)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "HolenavCharacter" })
  character: HolenavCharacter;

  @Field((type) => HolenavUser)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "HolenavUser" })
  user: HolenavUser;
}

export const SsoSessionSchema = SchemaFactory.createForClass(SsoSession);
