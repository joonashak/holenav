import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class MapTreeNode {
  @Field()
  name: string;

  @Field((type) => [MapTreeNode])
  children: MapTreeNode[];
}
