import { Field, InputType, ObjectType, OmitType } from "@nestjs/graphql";
import { SignatureOLD } from "../signature-OLD.model";
import { Signature } from "../signature.model";

@InputType()
export class AddSignaturesInput {
  @Field((type) => [CreatableSignature])
  signatures: CreatableSignature[];
}

@InputType()
export class CreatableSignature extends OmitType(Signature, ["id"]) {}

@ObjectType()
export class AddSignaturesOutput {
  @Field((type) => [SignatureOLD])
  signatures: SignatureOLD[];
}
