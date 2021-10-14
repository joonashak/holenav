import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@ObjectType()
@Schema()
export class UserSettings {
  @Field()
  @Prop({ default: "Jita" })
  activeMap: string;
}

export const UserSettingsSchema = SchemaFactory.createForClass(UserSettings);
