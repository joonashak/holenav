import { Field, InputType } from "@nestjs/graphql";
import SigType from "../enums/sig-type.enum";

@InputType()
export class SignaturePaste {
  @Field((type) => [PastedSignature])
  pastedSignatures: PastedSignature[];

  @Field()
  systemName: string;
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
