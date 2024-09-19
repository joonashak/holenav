import { Field, ObjectType, registerEnumType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { HolenavCharacter } from "../entities/character/character.model";
import SystemRole from "./roles/system-role.enum";

export type UserDocument = HolenavUser & mongoose.Document;

registerEnumType(SystemRole, { name: "SystemRoles" });

@ObjectType()
@Schema({ collection: "holenav-users" })
export class HolenavUser {
  @Field()
  id: string;

  @Field((type) => HolenavCharacter)
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "HolenavCharacter",
    unique: true,
  })
  main: HolenavCharacter;

  @Field((type) => [HolenavCharacter])
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "HolenavCharacter" }],
  })
  alts: HolenavCharacter[];

  @Field((type) => SystemRole)
  @Prop({ default: SystemRole.NONE })
  systemRole: SystemRole;
}

export const UserSchema = SchemaFactory.createForClass(HolenavUser);
