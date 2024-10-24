import { Field, InputType, OmitType } from "@nestjs/graphql";
import { CreateSignature } from "./create-signature.dto";

@InputType()
export class UpdateSignature extends OmitType(CreateSignature, ["systemName"]) {
  @Field()
  id: string;
}
