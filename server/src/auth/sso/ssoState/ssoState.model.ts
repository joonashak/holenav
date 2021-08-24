import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { Character } from "src/entities/character/character.model";

export type SsoStateDocument = SsoState & mongoose.Document;

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

  @Field((type) => Character)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Character" })
  character: Character;
}

export const SsoStateSchema = SchemaFactory.createForClass(SsoState);
