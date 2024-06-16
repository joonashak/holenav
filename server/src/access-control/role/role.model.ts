import { User } from "@joonashak/nestjs-clone-bay";
import { registerEnumType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { Action } from "./action.enum";
import { Subject } from "./subject.enum";

registerEnumType(Subject, { name: "Subject" });

@Schema()
export class Role {
  @Prop()
  subject: Subject;

  @Prop()
  action: Action;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name, unique: true })
  user: User;
}

export const RoleSchema = SchemaFactory.createForClass(Role);

export type RoleDocument = Role & Document;
