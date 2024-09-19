import { User } from "@joonashak/nestjs-clone-bay";
import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

@Schema({ collection: "user-preferences" })
@ObjectType()
export class UserPreferences {
  @Field()
  id: string;

  @Field(() => User)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name, unique: true })
  user: User;
}

export const UserPreferencesSchema =
  SchemaFactory.createForClass(UserPreferences);

export type UserPreferencesDocument = UserPreferences & Document;
