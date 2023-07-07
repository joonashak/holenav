import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class SsoTokenDto {
  @Field()
  esiId: string;

  @Field()
  accessToken: string;
}

@ObjectType()
export class UserSsoTokens {
  @Field((type) => SsoTokenDto)
  main: SsoTokenDto;

  @Field((type) => [SsoTokenDto])
  alts: SsoTokenDto[];
}
