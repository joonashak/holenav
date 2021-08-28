import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

export const CurrentUser = createParamDecorator((_, context: ExecutionContext) => {
  const gqlContext = GqlExecutionContext.create(context);
  return gqlContext.getContext().req.user;
});
