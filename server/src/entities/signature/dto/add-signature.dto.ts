import { Field, InputType } from "@nestjs/graphql";
import SigTypes from "../sig-types.enum";

@InputType()
export default class AddSignatureInput {
  @Field((type) => [SignatureInput])
  signatures: SignatureInput[];

  @Field()
  systemId: string;
}

@InputType()
class SignatureInput {
  @Field()
  eveId: string;

  @Field((type) => SigTypes, { nullable: true })
  type: SigTypes | null;

  @Field()
  name: string;
}
