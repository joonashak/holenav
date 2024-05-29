import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";
import { v4 as uuid } from "uuid";
import { HolenavUser } from "../../user/user.model";

@ObjectType()
@Schema({ collection: "holenav-sessions" })
export class Session {
  @Field()
  @Prop({ default: uuid, unique: true })
  id: string;

  @Field()
  @Prop({ type: Date })
  expiresAt: Date;

  @Field((type) => HolenavUser)
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: "HolenavUser" })
  user: HolenavUser;
}

export const SessionSchema = SchemaFactory.createForClass(Session);
export type SessionDocument = Session & Document;
