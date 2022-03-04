import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { FolderDocument } from "../../entities/folder/folder.model";

export const ActiveFolder = createParamDecorator((_, context: ExecutionContext): FolderDocument => {
  const gqlContext = GqlExecutionContext.create(context);
  // FIXME: Get this from the user object and check roles?
  return gqlContext.getContext().req.activeFolder;
});
