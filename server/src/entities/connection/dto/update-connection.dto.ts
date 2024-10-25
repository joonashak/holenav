import { InputType, OmitType, PartialType } from "@nestjs/graphql";
import { CreateConnection } from "./create-connection.dto";

@InputType()
export class UpdateConnection extends PartialType(
  OmitType(CreateConnection, ["from"]),
) {}
