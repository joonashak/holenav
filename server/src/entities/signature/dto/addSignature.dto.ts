import { Field, InputType } from "@nestjs/graphql";
import SigTypes from "../sigTypes.enum";

@InputType()
export default class AddSignatureInput {
  @Field()
  eveId: string;

  @Field((type) => SigTypes, { nullable: true })
  type: SigTypes | null;

  @Field()
  name: string;

  @Field()
  systemId: string;
}
