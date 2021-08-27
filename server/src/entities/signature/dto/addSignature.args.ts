import { ArgsType, Field } from "@nestjs/graphql";
import SigTypes from "../sigTypes.enum";

@ArgsType()
export default class AggSignatureArgs {
  @Field()
  eveId: string;

  @Field((type) => SigTypes)
  type: SigTypes;

  @Field()
  name: string;

  @Field()
  systemId: string;
}
