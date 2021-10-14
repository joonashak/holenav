import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SavedMap, SavedMapSchema } from "./savedMap.model";

@ObjectType()
@Schema()
export class UserSettings {
  @Field((type) => [SavedMap])
  @Prop({ type: [SavedMapSchema] })
  maps: SavedMap[];
}

export const UserSettingsSchema = SchemaFactory.createForClass(UserSettings);
