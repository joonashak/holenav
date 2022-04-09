import { ObjectType } from "@nestjs/graphql";

@ObjectType()
export default class StartSsoLoginDto {
  ssoLoginUrl: string;
}
