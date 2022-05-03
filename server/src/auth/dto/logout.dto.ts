import { Field, ObjectType } from "@nestjs/graphql";

// This is required because GraphQL does not have a null/void output type.
@ObjectType()
export default class LogoutDto {
  @Field()
  loggedOut: boolean;
}
