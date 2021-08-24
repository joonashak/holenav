import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { v4 as uuid } from "uuid";
import { Character } from "../entities/character/character.model";
import { Role } from "../role/role.model";

export type UserDocument = User & mongoose.Document;

@ObjectType()
@Schema()
export class User {
  @Field()
  @Prop({ default: uuid, unique: true })
  id: string;

  @Field((type) => [String])
  @Prop([String])
  tokens: string[];

  @Field((type) => Character)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Character", unique: true })
  main: Character;

  @Field((type) => [Role])
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, reg: "Role" }] })
  roles: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User);
