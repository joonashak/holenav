import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { AppSettings } from "./settings/app-settings.model";

export type AppDataDocument = AppData & Document;

@ObjectType()
@Schema({ collection: "app-data" })
export class AppData {
  @Field()
  @Prop({ default: "" })
  appVersion: string;

  @Field()
  @Prop({ default: "" })
  motd: string;

  @Field(() => AppSettings)
  @Prop({ type: AppSettings })
  settings: AppSettings;
}

export const AppDataSchema = SchemaFactory.createForClass(AppData);
