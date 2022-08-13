import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { Signature } from "../signature.model";

@InputType()
export class DeleteSignaturesInput {
  @Field((type) => [String])
  ids: string[];
}

@ObjectType()
export class DeleteSignaturesOutput {
  @Field((type) => [Signature])
  signatures: Signature[];
}
