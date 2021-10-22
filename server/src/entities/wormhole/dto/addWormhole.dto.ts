import { Field, InputType } from "@nestjs/graphql";
import MassStatus from "../massStatus.enum";

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
  eol: boolean;

  @Field((type) => MassStatus)
  massStatus: MassStatus;
}
