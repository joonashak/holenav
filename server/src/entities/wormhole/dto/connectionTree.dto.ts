import { Field, ObjectType } from "@nestjs/graphql";
import MassStatus from "../massStatus.enum";

@ObjectType()
export class ConnectionTree {
  @Field()
  rootSystemName: string;

  @Field((type) => [ConnectionTreeNode])
  children: ConnectionTreeNode[];
}

@ObjectType()
export class ConnectionTreeNode {
  @Field()
  name: string;

  @Field()
  systemName: string;

  @Field({ nullable: true })
  destinationName: string | null;

  @Field()
  type: string;

  @Field()
  reverseType: string;

  @Field()
  eol: boolean;

  @Field((type) => MassStatus)
  massStatus: MassStatus;

  @Field((type) => [ConnectionTreeNode])
  children: ConnectionTreeNode[];
}
