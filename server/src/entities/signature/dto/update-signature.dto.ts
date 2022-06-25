import { Field, InputType, PartialType } from "@nestjs/graphql";
import SigTypes from "../sig-types.enum";
import AddSignatureInput from "./add-signature.dto";

@InputType()
export default class UpdateSignatureInput extends PartialType(AddSignatureInput) {
  @Field()
  id: string;

  @Field()
  eveId: string;

  @Field((type) => SigTypes, { nullable: true })
  type: SigTypes | null;

  @Field()
  name: string;
}
