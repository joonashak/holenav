import { Field, InputType, PartialType } from "@nestjs/graphql";
import AddSignatureInput from "./add-signature.dto";

@InputType()
export default class UpdateSignatureInput extends PartialType(AddSignatureInput) {
  @Field()
  id: string;
}
