import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export default class AccessTokenDto {
  @Field()
  accessToken: string;
}
