import { Field, InputType } from "@nestjs/graphql";
import MassStatus from "../mass-status.enum";

@InputType()
export class CreateConnection {
  @Field()
  from: string;

  @Field({ nullable: true })
  to: string | null;

  @Field({ nullable: true })
  type: string;

  @Field()
  k162: boolean;

  @Field()
  eol: boolean;

  @Field(() => MassStatus)
  massStatus: MassStatus;
}
