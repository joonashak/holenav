import { Field, InputType, ObjectType, registerEnumType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { v4 as uuid } from "uuid";
import { Folder } from "../folder/folder.model";
import MassStatus from "./enums/mass-status.enum";
import SigType from "./enums/sig-type.enum";

export type SignatureDocument = SignatureOLD & mongoose.Document;

registerEnumType(SigType, { name: "SigType" });
registerEnumType(MassStatus, { name: "MassStatus" });

// This split is done because a reference to another @InputType class with
// duplicate field names breaks the GraphQL type system.
@InputType()
@ObjectType()
@Schema()
export class SignatureWithoutRefs {
  @Field()
  @Prop({ default: uuid, unique: true })
  id?: string;

  @Field()
  @Prop({ nullable: true })
  eveId?: string;

  @Field((type) => SigType)
  @Prop()
  type: SigType;

  @Field()
  @Prop()
  name: string;

  @Field()
  @Prop()
  systemName: string;

  /*
    Wormhole-only props:
  */

  @Field({ nullable: true })
  @Prop()
  wormholeType?: string;

  @Field({ nullable: true })
  @Prop({ default: false })
  eol?: boolean;

  @Field((type) => MassStatus, { nullable: true })
  @Prop({ default: MassStatus.STABLE })
  massStatus?: MassStatus;

  @Field({ nullable: true })
  @Prop()
  destinationName?: string;

  @Field({ nullable: true })
  @Prop()
  reverseType?: string;
}

@ObjectType()
@Schema()
export class SignatureOLD extends SignatureWithoutRefs {
  @Field((type) => Folder)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Folder" })
  folder: Folder;

  /*
    Wormhole-only props:
  */

  @Field((type) => SignatureOLD, { nullable: true })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "SignatureOLD", nullable: true })
  reverse?: SignatureOLD;
}

export const SignatureSchema = SchemaFactory.createForClass(SignatureOLD);
