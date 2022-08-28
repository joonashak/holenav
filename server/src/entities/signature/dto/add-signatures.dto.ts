import { Field, InputType, OmitType } from "@nestjs/graphql";
import MassStatus from "../enums/mass-status.enum";
import { SignatureWithoutConnection } from "../signature.model";

// FIXME: For whatever reason, using actual connection model fails.
@InputType()
export class ConnectionInput {
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

@InputType()
export class AddSignaturesInput {
  @Field((type) => [CreatableSignature])
  signatures: CreatableSignature[];
}

@InputType()
export class CreatableSignature extends OmitType(SignatureWithoutConnection, ["id"]) {
  @Field((type) => ConnectionInput, { nullable: true })
  connection?: ConnectionInput;
}
