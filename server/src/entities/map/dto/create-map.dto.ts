import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateMapDto {
  @Field()
  name: string;

  @Field()
  rootSystemName: string;
}
