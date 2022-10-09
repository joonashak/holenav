import { Field, InputType, PartialType } from "@nestjs/graphql";
import SigType from "../enums/sig-type.enum";
import { SignatureWithoutRefs } from "../signature-OLD.model";
import { Signature } from "../signature.model";

@InputType()
export class UpdateSignaturesInput {
  @Field((type) => [SignatureUpdate])
  signatures: Signature[];
}

@InputType()
export class SignatureUpdate extends PartialType(SignatureWithoutRefs) {
  @Field()
  id: string;

  @Field((type) => SigType)
  type: SigType;
}
