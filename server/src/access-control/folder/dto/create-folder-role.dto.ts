import { Field, InputType } from "@nestjs/graphql";
import { FolderAction } from "../folder-action.enum";

@InputType()
export class CreateFolderRoleDto {
  @Field(() => String)
  folderId: string;

  @Field(() => FolderAction)
  action: FolderAction;

  @Field({ nullable: true })
  userId: string | null;

  @Field({ nullable: true })
  corporationEveId: number | null;

  @Field({ nullable: true })
  allianceEveId: number | null;
}
