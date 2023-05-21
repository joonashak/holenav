import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class RegistrationSettingsUpdateDto {
  @Field({ nullable: true })
  enabled: boolean;

  @Field({ nullable: true })
  corporationFilterEnabled: boolean;

  @Field({ nullable: true })
  allianceFilterEnabled: boolean;
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
