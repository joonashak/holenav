import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class DeleteSignaturesInput {
  @Field(() => [String])
  ids: string[];
}
