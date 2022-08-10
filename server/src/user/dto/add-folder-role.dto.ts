import { Field, InputType } from "@nestjs/graphql";
import FolderRole from "../roles/folder-role.enum";

@InputType()
export default class AddFolderRoleInput {
  @Field()
  userEsiId: string;

  @Field()
  folderId: string;

  @Field((type) => FolderRole)
  role: FolderRole;
}
