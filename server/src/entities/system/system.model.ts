import { Field, ObjectType } from "@nestjs/graphql";
import mongoose from "mongoose";
import { Folder } from "../folder/folder.model";

export type SystemDocument = System & mongoose.Document;

@ObjectType()
export class System {
  @Field()
  id: string;

  @Field(() => String)
  name: string;

  @Field((type) => Folder)
  folder: Folder;
}
