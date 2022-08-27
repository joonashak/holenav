import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import getRequest from "../utils/get-request.util";

export const CurrentSession = createParamDecorator((_, context: ExecutionContext) => {
  const request = getRequest(context);
  return request.session;
});
