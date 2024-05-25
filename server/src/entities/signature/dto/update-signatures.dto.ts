import { Field, InputType } from "@nestjs/graphql";
import {
  ConnectionInput,
  CreatableSignatureWithoutConnection,
} from "./add-signatures.dto";

@InputType()
export class UpdateSignaturesInput {
  @Field((type) => [UpdateableSignature])
  signatures: UpdateableSignature[];
}

@InputType()
export class SignatureUpdateWithoutConnection extends CreatableSignatureWithoutConnection {
  @Field()
  id: string;
}

@InputType()
export class ConnectionInputUpdate extends ConnectionInput {
  @Field((type) => SignatureUpdateWithoutConnection)
  reverseSignature: SignatureUpdateWithoutConnection;
}

@InputType()
export class UpdateableSignature extends SignatureUpdateWithoutConnection {
  @Field((type) => ConnectionInputUpdate, { nullable: true })
  connection?: ConnectionInputUpdate;
}
