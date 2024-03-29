import { Field, ObjectType, registerEnumType } from "@nestjs/graphql";
import MassStatus from "./enums/mass-status.enum";
import { SignatureWithoutConnection } from "./signature.model";

registerEnumType(MassStatus, { name: "MassStatus" });

@ObjectType()
export class Connection {
  @Field()
  eol: boolean;

  @Field((type) => Date, { nullable: true })
  eolAt?: Date;

  @Field((type) => MassStatus)
  massStatus: MassStatus;

  @Field((type) => SignatureWithoutConnection)
  reverseSignature: SignatureWithoutConnection;
}
