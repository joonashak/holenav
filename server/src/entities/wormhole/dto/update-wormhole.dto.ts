import { Field, InputType, PartialType } from "@nestjs/graphql";
import AddWormholeInput from "./add-wormhole.dto";

@InputType()
export default class UpdateWormholeInput extends PartialType(AddWormholeInput) {
  @Field()
  id: string;
}
