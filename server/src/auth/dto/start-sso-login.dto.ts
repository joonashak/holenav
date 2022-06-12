import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export default class StartSsoLoginDto {
  @Field()
  ssoLoginUrl: string;
}
