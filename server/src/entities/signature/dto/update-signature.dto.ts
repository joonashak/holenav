import { Field, InputType } from "@nestjs/graphql";
import SigType from "../sig-type.enum";

@InputType()
export default class UpdateSignatureInput {
  @Field()
  id: string;

  @Field()
  eveId: string;

  @Field((type) => SigType, { nullable: true })
  type: SigType | null;

  @Field()
  name: string;
}

@InputType()
export class UpdateSignatureBatch {
  @Field((type) => [UpdateSignatureInput])
  signatures: UpdateSignatureInput[];
}
