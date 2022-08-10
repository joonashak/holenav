import { Field, InputType } from "@nestjs/graphql";
import SigType from "../sig-type.enum";

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

  @Field((type) => SigType, { nullable: true })
  type: SigType | null;

  @Field()
  name: string;
}
