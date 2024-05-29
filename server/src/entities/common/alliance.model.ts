import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@ObjectType()
@Schema()
export class HolenavAlliance {
  @Field()
  @Prop()
  esiId: string;

  @Field()
  @Prop()
  name: string;

  @Field()
  @Prop()
  ticker: string;
}

export const CorporationSchema = SchemaFactory.createForClass(HolenavAlliance);
