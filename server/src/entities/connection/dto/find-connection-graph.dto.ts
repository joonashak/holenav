import { Field, ObjectType } from "@nestjs/graphql";
import { GraphConnection } from "./graph-connection.dto";

@ObjectType()
export class FindConnectionGraph {
  @Field()
  root: string;

  @Field(() => [GraphConnection])
  connections: GraphConnection[];
}
