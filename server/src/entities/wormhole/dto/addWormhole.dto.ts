import { Field, InputType } from "@nestjs/graphql";

@InputType()
export default class AddWormholeInput {
  @Field()
  name: string;

  @Field()
  systemName: string;

  @Field({ nullable: true })
  destinationName?: string;
}
