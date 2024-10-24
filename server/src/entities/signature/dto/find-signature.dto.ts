import { Field, ObjectType, OmitType } from "@nestjs/graphql";
import { ConnectionWithoutReverse } from "../../connection/dto/connection-without-reverse.dto";
import { Signature } from "../signature.model";

@ObjectType()
export class FindSignature extends OmitType(Signature, ["connection"]) {
  @Field(() => ConnectionWithoutReverse, { nullable: true })
  connection: ConnectionWithoutReverse;
}
