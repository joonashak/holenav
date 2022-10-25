import { Field, ObjectType, registerEnumType } from "@nestjs/graphql";
import { Connection } from "./connection.model";
import SigType from "./enums/sig-type.enum";

registerEnumType(SigType, { name: "SigType" });

// This split is done because a reference to another @InputType class with
// duplicate field names breaks the GraphQL type system.
@ObjectType()
export class SignatureWithoutConnection {
  @Field()
  id: string;

  @Field()
  eveId: string;

  @Field((type) => SigType)
  type: SigType;

  @Field({ nullable: true })
  wormholeType?: string;

  @Field()
  name: string;

  @Field()
  systemName: string;
}

@ObjectType()
export class Signature extends SignatureWithoutConnection {
  @Field((type) => Connection, { nullable: true })
  connection?: Connection;
}
