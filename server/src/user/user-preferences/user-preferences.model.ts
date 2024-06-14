import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Map } from "./map.model";

@Schema()
@ObjectType()
export class UserPreferences {
  @Field()
  id: string;

  @Field(() => [Map])
  @Prop(() => [Map])
  maps: Map[];
}

export const UserPreferencesSchema =
  SchemaFactory.createForClass(UserPreferences);
