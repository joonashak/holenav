import { Field, ObjectType, OmitType } from "@nestjs/graphql";

@ObjectType()
export class System {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  folderId: string;

  /**
   * Indicates if a system is an unknown system. These pseudo-systems are
   * created for the purpose of graph completeness when the system on the
   * otherside of a wormhole is not known.
   */
  @Field()
  pseudo: boolean;
}

@ObjectType()
export class UpsertableSystem extends OmitType(System, ["id"]) {}
