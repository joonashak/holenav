import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type SystemDocument = System & Document;

@Schema()
export class System {
  @Prop()
  name: string;
}

export const SystemSchema = SchemaFactory.createForClass(System);
