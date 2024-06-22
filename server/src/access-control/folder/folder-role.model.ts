import { Field, ObjectType, registerEnumType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { FolderAction } from "./folder-action.enum";

registerEnumType(FolderAction, { name: "FolderAction" });

/**
 * Grants access to folder.
 *
 * Folder role authorizes an actor to execute `action` on `folderId`. The actor
 * may be a user, a corporation, or an alliance. If multiple types of actors are
 * specified, only the first one is used for authorization (processing order:
 * user, corporation, alliance).
 *
 * Only the user's main character is used to match for corporation and alliance
 * roles. (This avoids the confusing situation where, e.g., corporation X is
 * allowed to read a folder and a user showing up as a corporation Y member can
 * read the folder because they have an alt in X.)
 */
@ObjectType()
@Schema({ collection: "folder-roles" })
export class FolderRole {
  @Field()
  @Prop({ index: true })
  folderId: string;

  @Field(() => FolderAction)
  @Prop()
  action: FolderAction;

  @Field({ nullable: true })
  @Prop()
  userId: string | null;

  @Field({ nullable: true })
  @Prop()
  corporationEveId: number | null;

  @Field({ nullable: true })
  @Prop()
  allianceEveId: number | null;
}

export const FolderRoleSchema = SchemaFactory.createForClass(FolderRole);

export type FolderRoleDocument = FolderRole & Document;
