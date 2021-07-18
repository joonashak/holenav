import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type SystemDocument = System & Document;

@ObjectType()
@Schema()
export class System {
  @Field(() => String)
  @Prop()
  name: string;
}

export const SystemSchema = SchemaFactory.createForClass(System);
