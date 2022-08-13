import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { Signature, SignatureWithoutRefs } from "../signature.model";

@InputType()
export class UpdateSignaturesInput {
  @Field((type) => [SignatureWithoutRefs])
  signatures: SignatureWithoutRefs[];
}

@ObjectType()
export class UpdateSignatureOutput {
  @Field((type) => [Signature])
  signatures: Signature[];
}
