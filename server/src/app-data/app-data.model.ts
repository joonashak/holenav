import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type AppDataDocument = AppData & Document;

@ObjectType()
@Schema({ collection: "app-data", capped: { size: 4096, max: 1 } })
export class AppData {
  @Field()
  @Prop({ default: "" })
  appVersion: string;

  @Field()
  @Prop({ default: "" })
  motd: string;
}

export const AppDataSchema = SchemaFactory.createForClass(AppData);
