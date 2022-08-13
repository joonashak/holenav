import { Field, InputType, ObjectType, OmitType } from "@nestjs/graphql";
import { Signature, SignatureWithoutRefs } from "../signature.model";

@InputType()
export class AddSignaturesInput {
  @Field((type) => [SignatureInput])
  signatures: SignatureInput[];
}

@InputType()
class SignatureInput extends OmitType(SignatureWithoutRefs, ["id"]) {}

@ObjectType()
export class AddSignaturesOutput {
  @Field((type) => [Signature])
  signatures: Signature[];
}
