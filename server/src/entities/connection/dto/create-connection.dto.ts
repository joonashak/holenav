import { Field, InputType } from "@nestjs/graphql";
import MassStatus from "../mass-status.enum";

@InputType()
export class CreateConnection {
  @Field()
  from: string;

  @Field(() => String, { nullable: true })
  to: string | null;

  @Field(() => String, { nullable: true })
  type: string | null;

  @Field()
  k162: boolean;

  @Field()
  eol: boolean;

  @Field(() => MassStatus)
  massStatus: MassStatus;
}
