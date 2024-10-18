import { Field, ObjectType } from "@nestjs/graphql";
import { ChainRoot } from "./chain-root.dto";

@ObjectType()
export class FindConnectionGraph {
  @Field()
  root: string;

  @Field(() => [ChainRoot])
  chains: ChainRoot[];
}
