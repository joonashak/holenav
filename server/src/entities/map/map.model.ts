import { User } from "@joonashak/nestjs-clone-bay";
import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

@Schema()
@ObjectType()
export class Map {
  @Field()
  id: string;

  @Field(() => User)
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
    required: true,
  })
  user: User;

  @Field()
  @Prop()
  name: string;

  @Field()
  @Prop()
  rootSystemName: string;
}

export const MapSchema = SchemaFactory.createForClass(Map);
export type MapDocument = Map & Document;
