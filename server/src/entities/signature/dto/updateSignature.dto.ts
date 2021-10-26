import { Field, InputType, PartialType } from "@nestjs/graphql";
import AddSignatureInput from "./addSignature.dto";

@InputType()
export default class UpdateSignatureInput extends PartialType(AddSignatureInput) {
  @Field()
  id: string;
}
