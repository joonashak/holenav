import { Field, ObjectType } from "@nestjs/graphql";
import { Signature } from "../signature.model";

@ObjectType()
export class GetSignaturesOutput {
  @Field((type) => [Signature])
  signatures: Signature[];
}
