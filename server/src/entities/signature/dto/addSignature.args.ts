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

  @Field({ nullable: true })
  whType?: string;

  @Field({ defaultValue: false })
  whEol?: boolean;

  @Field({ nullable: true })
  whMass?: string;
}
