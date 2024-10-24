import { ObjectType, OmitType } from "@nestjs/graphql";
import { Connection } from "../connection.model";

@ObjectType()
export class ConnectionWithoutReverse extends OmitType(Connection, [
  "reverse",
]) {}
