import { Field, ObjectType, registerEnumType } from "@nestjs/graphql";
import { Connection } from "./connection.model";
import SigType from "./enums/sig-type.enum";

registerEnumType(SigType, { name: "SigType" });

@ObjectType()
export class Signature {
  @Field()
  id: string;

  @Field()
  eveId: string;

  @Field((type) => SigType)
  type: SigType;

  @Field()
  name: string;

  @Field()
  systemName: string;

  @Field((type) => Connection, { nullable: true })
  connection?: Connection;
}
