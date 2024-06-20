import { Field, InputType } from "@nestjs/graphql";
import { FolderAction } from "../folder-action.enum";

@InputType()
export class CreateFolderRoleDto {
  @Field(() => FolderAction)
  action: FolderAction;

  @Field(() => String)
  userId: string;

  @Field(() => String)
  folderId: string;
}
