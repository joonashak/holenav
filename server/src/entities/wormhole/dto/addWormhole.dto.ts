import { ArgsType, Field } from "@nestjs/graphql";

@ArgsType()
export default class AddWormholeArgs {
  @Field()
  name: string;

  @Field()
  systemName: string;

  @Field({ nullable: true })
  destinationName?: string;
}
