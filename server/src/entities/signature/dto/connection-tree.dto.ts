import { Field, ObjectType } from "@nestjs/graphql";
import { Signature } from "../signature.model";

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

  @Field((type) => [ConnectionTreeNode])
  children: ConnectionTreeNode[];

  @Field((type) => Signature)
  wormhole: Signature;
}