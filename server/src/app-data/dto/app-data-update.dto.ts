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
  @Field(() => RegistrationSettingsUpdateDto, { nullable: true })
  registration: RegistrationSettingsUpdateDto;
}

@InputType()
export class AppDataUpdateDto {
  @Field(() => AppSettingsUpdateDto, { nullable: true })
  settings: AppSettingsUpdateDto;
}
