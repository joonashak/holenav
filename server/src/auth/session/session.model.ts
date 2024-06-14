import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";
import { HolenavUser } from "../../user/user.model";

@ObjectType()
@Schema({ collection: "holenav-sessions" })
export class Session {
  @Field()
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
