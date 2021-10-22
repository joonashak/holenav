import { Field, InputType } from "@nestjs/graphql";
import SigTypes from "../sigTypes.enum";

@InputType()
export default class AddSignatureInput {
  @Field()
  eveId: string;

  @Field((type) => SigTypes)
  type: SigTypes;

  @Field()
  name: string;

  @Field()
  systemId: string;
}
