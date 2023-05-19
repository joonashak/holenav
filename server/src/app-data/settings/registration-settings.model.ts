import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema } from "@nestjs/mongoose";

@ObjectType()
@Schema()
export class RegistrationSettings {
  /**
   * Controls whether new users can register at all.
   */
  @Field()
  @Prop()
  enabled: boolean;

  /**
   * List of tickers of corporations that registrations are allowed from.
   */
  @Field((type) => [String])
  @Prop({ type: [String] })
  allowedCorporations: string[];

  /**
   * List of tickers of alliances that registrations are allowed from.
   */
  @Field((type) => [String])
  @Prop({ type: [String] })
  allowedAlliances: string[];
}
