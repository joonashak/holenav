import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

export const CurrentSession = createParamDecorator((_, context: ExecutionContext) => {
  const gqlContext = GqlExecutionContext.create(context);
  return gqlContext.getContext().req.session;
});
