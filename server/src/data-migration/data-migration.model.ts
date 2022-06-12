import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type DataMigrationDocument = DataMigration & Document;

@ObjectType()
@Schema({ collection: "dataMigration", capped: { size: 124, max: 1 } })
export class DataMigration {
  @Field()
  @Prop()
  version: number;
}

export const DataMigrationSchema = SchemaFactory.createForClass(DataMigration);
