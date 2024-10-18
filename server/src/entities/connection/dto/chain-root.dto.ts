import { Field, ObjectType, OmitType } from "@nestjs/graphql";
import { Connection } from "../connection.model";
import { GraphConnection } from "./graph-connection.dto";

@ObjectType()
export class ChainRoot extends OmitType(Connection, ["reverse"]) {
  @Field()
  reverse: string;

  @Field(() => [GraphConnection])
  children: GraphConnection[];
}
