import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import getRequest from "../utils/get-request.util";

export const CurrentUser = createParamDecorator((_, context: ExecutionContext) => {
  const request = getRequest(context);
  return request.user;
});
