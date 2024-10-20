import { Field, ObjectType, registerEnumType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import MassStatus from "./mass-status.enum";

registerEnumType(MassStatus, { name: "MassStatus" });

@ObjectType()
@Schema()
export class Connection {
  @Field()
  id: string;

  @Field()
  @Prop({ index: true })
  from: string;

  @Field()
  @Prop()
  to: string;

  /**
   * Indicates unknown destination.
   *
   * This is a convenience flag to make working with unknown connections easier
   * and basically just tells if either `from` or `to` is unknown (UUID).
   */
  @Field()
  @Prop()
  unknown: boolean;

  /**
   * Connection's inherent type.
   *
   * Defined as the type of the "named-side" wormhole (e.g. H296) regardless of
   * the actual direction, i.e., this type can never be K162.
   */
  @Field({ nullable: true })
  @Prop()
  type: string;

  @Field()
  @Prop()
  k162: boolean;

  @Field()
  @Prop()
  eol: boolean;

  @Field((type) => Date, { nullable: true })
  @Prop()
  eolAt?: Date;

  @Field((type) => MassStatus)
  @Prop()
  massStatus: MassStatus;

  @Field((type) => Connection)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Connection.name })
  reverse: Connection;
}

export type ConnectionDocument = Connection & Document;

export const ConnectionSchema = SchemaFactory.createForClass(Connection);
