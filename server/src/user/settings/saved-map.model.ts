import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { v4 as uuid } from "uuid";

@ObjectType()
@Schema()
export class SavedMap {
  @Field()
  @Prop({ default: uuid, unique: true })
  id?: string;

  @Field()
  @Prop()
  name: string;

  @Field()
  @Prop()
  rootSystemName: string;
}

export const SavedMapSchema = SchemaFactory.createForClass(SavedMap);
