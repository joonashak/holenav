import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema } from "@nestjs/mongoose";
import { RegistrationSettings } from "./registration-settings.model";

@ObjectType()
@Schema()
export class AppSettings {
  @Field(() => RegistrationSettings)
  @Prop({ type: RegistrationSettings })
  registration: RegistrationSettings;
}
