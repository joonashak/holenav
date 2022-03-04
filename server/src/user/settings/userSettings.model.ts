import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Folder } from "../../entities/folder/folder.model";
import { SavedMap, SavedMapSchema } from "./savedMap.model";

@ObjectType()
@Schema()
export class UserSettings {
  @Field((type) => [SavedMap])
  @Prop({ type: [SavedMapSchema] })
  maps: SavedMap[];

  @Field((type) => SavedMap, { nullable: true })
  @Prop({ type: SavedMap })
  selectedMap?: SavedMap | null;

  @Field((type) => Folder, { nullable: true })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Folder" })
  activeFolder: Folder | null;
}

export const UserSettingsSchema = SchemaFactory.createForClass(UserSettings);
