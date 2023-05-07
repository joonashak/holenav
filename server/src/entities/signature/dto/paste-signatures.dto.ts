import { Field, InputType, ObjectType } from "@nestjs/graphql";
import SigType from "../enums/sig-type.enum";
import { Signature } from "../signature.model";

@InputType()
export class SignaturePaste {
  @Field((type) => [PastedSignature])
  pastedSignatures: PastedSignature[];

  @Field()
  systemName: string;

  @Field({ nullable: true })
  deleteMissingSigs?: boolean;
}

@InputType()
export class PastedSignature {
  @Field()
  eveId: string;

  @Field((type) => SigType)
  type: SigType;

  @Field()
  name: string;
}

@ObjectType()
export class SignaturePasteResult {
  @Field((type) => [Signature])
  added: Signature[];

  @Field((type) => [Signature])
  updated: Signature[];

  @Field((type) => [Signature])
  deleted: Signature[];
}
