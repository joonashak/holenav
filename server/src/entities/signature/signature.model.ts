import { Field, ObjectType, registerEnumType } from "@nestjs/graphql";
import { Connection } from "../connection/connection.model";
import SigType from "./enums/sig-type.enum";

registerEnumType(SigType, { name: "SigType" });

// FIXME: This is probably not right and should be refactored.
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

  // FIXME: Remove.
  @Field({ nullable: true })
  wormholeType?: string;

  @Field()
  name: string;

  @Field()
  systemName: string;

  @Field((type) => Date, { nullable: true })
  createdAt?: Date;
}

@ObjectType()
export class Signature extends SignatureWithoutConnection {
  @Field((type) => Connection, { nullable: true })
  connection?: Connection;
}
