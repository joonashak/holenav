import { Field, ObjectType, OmitType } from "@nestjs/graphql";
import { Signature } from "../../signature/signature.model";
import { Connection } from "../connection.model";

@ObjectType()
export class GraphConnection extends OmitType(Connection, ["reverse"]) {
  @Field()
  reverse: string;

  @Field()
  depth: number;

  /**
   * This really should not be nullable but will have to be as long as reverse
   * signatures are not implemented.
   */
  @Field({ nullable: true })
  signature?: Signature;
}
