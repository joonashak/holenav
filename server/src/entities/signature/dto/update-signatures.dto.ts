import { Field, InputType } from "@nestjs/graphql";
import { CreatableSignature } from "./add-signatures.dto";

@InputType()
export class UpdateSignaturesInput {
  @Field((type) => [UpdateableSignature])
  signatures: UpdateableSignature[];
}

@InputType()
export class UpdateableSignature extends CreatableSignature {
  @Field()
  id: string;
}
