import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { FolderDocument } from "../../entities/folder/folder.model";
import getRequest from "../utils/get-request.util";

export const ActiveFolder = createParamDecorator(
  (_, context: ExecutionContext): FolderDocument => {
    const request = getRequest(context);
    return request.activeFolder;
  },
);
