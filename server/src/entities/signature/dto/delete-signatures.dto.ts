import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class DeleteSignaturesInput {
  @Field((type) => [String])
  ids: string[];
}
