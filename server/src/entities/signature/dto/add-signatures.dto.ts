import { Field, InputType } from "@nestjs/graphql";
import { CreateConnection } from "../../connection/dto/create-connection.dto";
import SigType from "../enums/sig-type.enum";

@InputType()
export class CreateSignature {
  @Field()
  eveId: string;

  @Field(() => SigType)
  type: SigType;

  @Field({ nullable: true })
  name: string;

  @Field()
  systemName: string;

  @Field(() => CreateConnection, { nullable: true })
  connection: CreateConnection | null;
}
