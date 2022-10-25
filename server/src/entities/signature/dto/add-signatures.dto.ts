import { Field, InputType, OmitType } from "@nestjs/graphql";
import MassStatus from "../enums/mass-status.enum";
import { SignatureWithoutConnection } from "../signature.model";

@InputType()
export class CreatableSignatureWithoutConnection extends OmitType(SignatureWithoutConnection, [
  "id",
]) {}

// FIXME: For whatever reason, using actual connection model fails.
@InputType()
export class ConnectionInput {
  @Field()
  eol: boolean;

  @Field((type) => MassStatus)
  massStatus: MassStatus;

  @Field((type) => CreatableSignatureWithoutConnection)
  reverseSignature: CreatableSignatureWithoutConnection;
}

@InputType()
export class AddSignaturesInput {
  @Field((type) => [CreatableSignature])
  signatures: CreatableSignature[];
}

@InputType()
export class CreatableSignature extends CreatableSignatureWithoutConnection {
  @Field((type) => ConnectionInput, { nullable: true })
  connection?: ConnectionInput;
}
