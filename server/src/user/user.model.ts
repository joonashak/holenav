import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { Character } from "../entities/character/character.model";

export type UserDocument = User & mongoose.Document;

@ObjectType()
@Schema()
export class User {
  @Field((type) => [String])
  @Prop([String])
  tokens: string[];

  @Field((type) => Character)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Character", unique: true })
  main: Character;
}

export const UserSchema = SchemaFactory.createForClass(User);
