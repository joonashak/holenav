import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { SsoToken } from "../../auth/sso/sso-token/sso-token.model";
import { Alliance } from "../common/alliance.model";
import { Corporation } from "../common/corporation.model";

export type CharacterDocument = Character & Document;

@ObjectType()
@Schema()
export class Character {
  @Field()
  @Prop({ unique: true })
  name: string;

  @Field()
  @Prop({ unique: true })
  esiId: string;

  @Field((type) => SsoToken, { nullable: true })
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: SsoToken.name,
    select: false,
  })
  ssoToken: SsoToken;

  @Field()
  @Prop({ default: false })
  isMain: boolean;

  @Field((type) => Corporation)
  @Prop({ type: Corporation })
  corporation: Corporation;

  @Field((type) => Alliance, { nullable: true })
  @Prop({ type: Alliance })
  alliance: Alliance;

  @Field({ defaultValue: "" })
  @Prop()
  portraitUrl: string;
}

export const CharacterSchema = SchemaFactory.createForClass(Character).index({
  name: "text",
});
