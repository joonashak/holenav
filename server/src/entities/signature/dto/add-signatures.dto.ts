import { Field, InputType, ObjectType, OmitType } from "@nestjs/graphql";
import MassStatus from "../enums/mass-status.enum";
import { SignatureOLD } from "../signature-OLD.model";
import { SignatureWithoutConnection } from "../signature.model";

// FIXME: For whatever reason, using actual connection model fails.
@InputType()
export class ConnectionInput {
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

@ObjectType()
export class AddSignaturesOutput {
  @Field((type) => [SignatureOLD])
  signatures: SignatureOLD[];
}
