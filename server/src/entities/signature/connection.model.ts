import { Field, ObjectType, registerEnumType } from "@nestjs/graphql";
import MassStatus from "./enums/mass-status.enum";
import SigType from "./enums/sig-type.enum";

registerEnumType(SigType, { name: "SigType" });
registerEnumType(MassStatus, { name: "MassStatus" });

@ObjectType()
export class Connection {
  @Field({ nullable: true })
  wormholeType?: string;

  @Field()
  eol: boolean;

  @Field((type) => MassStatus)
  massStatus: MassStatus;

  @Field({ nullable: true })
  destinationName?: string;

  @Field({ nullable: true })
  reverseType?: string;
}
