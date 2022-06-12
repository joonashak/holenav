import { Field, InputType } from "@nestjs/graphql";
import MassStatus from "../mass-status.enum";

@InputType()
export default class AddWormholeInput {
  @Field()
  name: string;

  @Field()
  systemName: string;

  @Field({ nullable: true })
  destinationName: string | null;

  @Field()
  eveId: string;

  @Field()
  type: string;

  @Field()
  reverseType: string;

  @Field()
  eol: boolean;

  @Field((type) => MassStatus)
  massStatus: MassStatus;
}
