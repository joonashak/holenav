import { Field, ObjectType, OmitType } from "@nestjs/graphql";
import { Connection } from "../connection.model";

@ObjectType()
export class GraphConnection extends OmitType(Connection, ["reverse"]) {
  @Field()
  reverse: string;

  @Field()
  depth: number;
}
