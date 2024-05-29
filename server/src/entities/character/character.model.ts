import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { SsoToken } from "../../auth/sso/sso-token/sso-token.model";
import { HolenavAlliance } from "../common/alliance.model";
import { HolenavCorporation } from "../common/corporation.model";

export type CharacterDocument = HolenavCharacter & Document;

@ObjectType()
@Schema()
export class HolenavCharacter {
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

  @Field((type) => HolenavCorporation)
  @Prop({ type: HolenavCorporation })
  corporation: HolenavCorporation;

  @Field((type) => HolenavAlliance, { nullable: true })
  @Prop({ type: HolenavAlliance })
  alliance: HolenavAlliance;

  @Field({ defaultValue: "" })
  @Prop()
  portraitUrl: string;
}

export const CharacterSchema = SchemaFactory.createForClass(
  HolenavCharacter,
).index({
  name: "text",
});
