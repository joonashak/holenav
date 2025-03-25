import { Field, InputType, OmitType, PartialType } from "@nestjs/graphql";
import { UpdateConnection } from "../../connection/dto/update-connection.dto";
import { CreateSignature } from "./create-signature.dto";

@InputType()
export class UpdateSignature extends PartialType(
  OmitType(CreateSignature, ["systemName", "connection"]),
) {
  @Field()
  id: string;

  @Field(() => UpdateConnection, { nullable: true })
  connection?: UpdateConnection | null;
}
