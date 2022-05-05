import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

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

  @Field({ nullable: true })
  @Prop({ select: false })
  accessToken: string;

  @Field({ nullable: true })
  @Prop({ select: false })
  refreshToken: string;

  @Field()
  @Prop({ default: false })
  isMain: boolean;
}

export const CharacterSchema = SchemaFactory.createForClass(Character).index({ name: "text" });
