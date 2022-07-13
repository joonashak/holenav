import { Field, InputType, PartialType } from "@nestjs/graphql";
import { WormholeInput } from "./add-wormhole.dto";

@InputType()
export default class UpdateWormholeInput extends PartialType(WormholeInput) {
  @Field()
  id: string;
}
