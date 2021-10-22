import { Field, InputType, PartialType } from "@nestjs/graphql";
import AddWormholeInput from "./addWormhole.dto";

@InputType()
export default class UpdateWormholeInput extends PartialType(AddWormholeInput) {
  @Field()
  id: string;
}
