import { Field, InputType } from "@nestjs/graphql";
import { SignatureWithoutRefs } from "../signature.model";

@InputType()
export class UpdateSignaturesInput {
  @Field((type) => [SignatureWithoutRefs])
  signatures: SignatureWithoutRefs[];
}
