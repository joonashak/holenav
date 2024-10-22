import { User } from "@joonashak/nestjs-clone-bay";
import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { Folder } from "../../entities/folder/folder.model";

@Schema({ collection: "user-preferences" })
@ObjectType()
export class UserPreferences {
  @Field()
  id: string;

  @Field(() => User)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name, unique: true })
  user: User;

  @Field(() => Folder, { nullable: true })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Folder.name })
  activeFolder: Folder;
}

export const UserPreferencesSchema =
  SchemaFactory.createForClass(UserPreferences);

export type UserPreferencesDocument = UserPreferences & Document;
