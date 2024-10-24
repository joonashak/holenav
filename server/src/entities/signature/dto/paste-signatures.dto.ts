import { Field, InputType, ObjectType } from "@nestjs/graphql";
import SigType from "../enums/sig-type.enum";
import { Signature } from "../signature.model";
import { FindSignature } from "./find-signature.dto";

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

  @Field((type) => [FindSignature])
  updated: FindSignature[];

  @Field((type) => [Signature])
  deleted: Signature[];
}
