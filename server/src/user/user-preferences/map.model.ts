import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
@ObjectType()
export class Map {
  @Field()
  id: string;

  @Field()
  @Prop()
  name: string;

  @Field()
  @Prop()
  rootSystemName: string;
}

export const MapSchema = SchemaFactory.createForClass(Map);
