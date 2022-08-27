import { Field, InputType, ObjectType, OmitType } from "@nestjs/graphql";
import { SignatureOLD, SignatureWithoutRefs } from "../signature-OLD.model";

@InputType()
export class AddSignaturesInput {
  @Field((type) => [SignatureInput])
  signatures: SignatureInput[];
}

@InputType()
class SignatureInput extends OmitType(SignatureWithoutRefs, ["id"]) {}

@ObjectType()
export class AddSignaturesOutput {
  @Field((type) => [SignatureOLD])
  signatures: SignatureOLD[];
}
