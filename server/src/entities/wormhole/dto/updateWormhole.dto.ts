import { Field, InputType } from "@nestjs/graphql";

@InputType()
export default class UpdateWormholeArgs {
  @Field()
  id: string;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  systemName: string;

  @Field({ nullable: true })
  destinationName?: string;
}
