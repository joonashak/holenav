import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { Character } from "src/entities/character/character.model";

export type SsoSessionDocument = SsoSession & mongoose.Document;

@ObjectType()
@Schema({ collection: "ssoSessions" })
export class SsoSession {
  @Field()
  @Prop({ unique: true })
  key: string;

  @Field()
  @Prop()
  expiry: Date;

  @Field()
  @Prop({ default: false })
  ssoLoginSuccess: boolean;

  @Field((type) => Character)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Character" })
  character: Character;
}

export const SsoSessionSchema = SchemaFactory.createForClass(SsoSession);
