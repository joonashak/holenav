import { Field, InputType } from "@nestjs/graphql";
import FolderRoles from "../roles/folderRoles.enum";

@InputType()
export default class AddFolderRoleInput {
  @Field()
  userEsiId: string;

  @Field()
  folderId: string;

  @Field((type) => FolderRoles)
  role: FolderRoles;
}
