import { Field, ObjectType, registerEnumType } from "@nestjs/graphql";
import MassStatus from "./enums/mass-status.enum";

registerEnumType(MassStatus, { name: "MassStatus" });

@ObjectType()
export class Connection {
  @Field()
  wormholeType: string;

  @Field()
  eol: boolean;

  @Field((type) => MassStatus)
  massStatus: MassStatus;

  @Field()
  destinationName: string;

  @Field()
  reverseType: string;
}
