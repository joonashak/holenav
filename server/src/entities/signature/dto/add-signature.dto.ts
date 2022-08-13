import { Field, InputType, OmitType } from "@nestjs/graphql";
import { SignatureWithoutRefs } from "../signature.model";

@InputType()
export default class AddSignaturesInput {
  @Field((type) => [SignatureInput])
  signatures: SignatureInput[];
}

@InputType()
class SignatureInput extends OmitType(SignatureWithoutRefs, ["id"]) {}
