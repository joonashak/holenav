import { Field, InputType, OmitType } from "@nestjs/graphql";
import MassStatus from "../enums/mass-status.enum";
import { SignatureWithoutConnection } from "../signature.model";

@InputType()
class SignatureWithoutConnectionInput extends SignatureWithoutConnection {}

@InputType()
export class CreatableSignatureWithoutConnection extends OmitType(SignatureWithoutConnectionInput, [
  "id",
]) {
  @Field({ nullable: true })
  id?: string;
}

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
