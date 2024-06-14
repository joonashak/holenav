import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@ObjectType()
@Schema()
export class SavedMap {
  @Field()
  id?: string;

  @Field()
  @Prop()
  name: string;

  @Field()
  @Prop()
  rootSystemName: string;
}

export const SavedMapSchema = SchemaFactory.createForClass(SavedMap);
