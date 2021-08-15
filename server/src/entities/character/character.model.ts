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
  @Prop()
  accessToken: string;

  @Field({ nullable: true })
  @Prop()
  refreshToken: string;
}

export const CharacterSchema = SchemaFactory.createForClass(Character);
