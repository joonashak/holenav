import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class RegistrationSettingsUpdateDto {
  @Field({ nullable: true })
  enabled: boolean;

  @Field({ nullable: true })
  corporationFilterEnabled: boolean;

  @Field({ nullable: true })
  allianceFilterEnabled: boolean;

  @Field((type) => [String], { nullable: true })
  allowedCorporations: string[];

  @Field((type) => [String], { nullable: true })
  allowedAlliances: string[];
}

@InputType()
export class AppSettingsUpdateDto {
  @Field((type) => RegistrationSettingsUpdateDto, { nullable: true })
  registration: RegistrationSettingsUpdateDto;
}

@InputType()
export class AppDataUpdateDto {
  @Field((type) => AppSettingsUpdateDto, { nullable: true })
  settings: AppSettingsUpdateDto;
}
