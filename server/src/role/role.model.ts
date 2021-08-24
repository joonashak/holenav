import { Field, ObjectType, registerEnumType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import Roles from "./roles.enum";

export type RoleDocument = Role & mongoose.Document;

registerEnumType(Roles, { name: "Roles" });

@ObjectType()
@Schema()
export class Role {
  @Field((type) => Roles)
  @Prop()
  role: Roles;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
