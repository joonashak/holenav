import { Field, InputType } from "@nestjs/graphql";
import { FolderAction } from "../folder-action.enum";

@InputType()
export class CreateFolderRoleDto {
  @Field(() => String)
  folderId: string;

  @Field(() => FolderAction)
  action: FolderAction;

  @Field({ nullable: true })
  public?: boolean;

  @Field({ nullable: true })
  userId?: string;

  @Field({ nullable: true })
  corporationEveId?: number;

  @Field({ nullable: true })
  allianceEveId?: number;
}
