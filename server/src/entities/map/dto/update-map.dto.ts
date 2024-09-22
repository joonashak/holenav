import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UpdateMapDto {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  rootSystemName: string;
}
