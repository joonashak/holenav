import { Field, InputType } from "@nestjs/graphql";
import SigTypes from "../sig-types.enum";

@InputType()
export default class UpdateSignatureInput {
  @Field()
  id: string;

  @Field()
  eveId: string;

  @Field((type) => SigTypes, { nullable: true })
  type: SigTypes | null;

  @Field()
  name: string;
}

@InputType()
export class UpdateSignatureBatch {
  @Field((type) => [UpdateSignatureInput])
  signatures: UpdateSignatureInput[];
}
