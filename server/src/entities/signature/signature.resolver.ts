import { Args, Mutation, Resolver } from "@nestjs/graphql";
import AggSignatureArgs from "./dto/addSignature.args";
import { Signature } from "./signature.model";
import { SignatureService } from "./signature.service";

@Resolver()
export class SignatureResolver {
  constructor(private sigService: SignatureService) {}

  @Mutation((returns) => Signature)
  async addSignature(@Args() args: AggSignatureArgs) {
    const { systemId, ...signature } = args;
    const newSig = await this.sigService.createSignature(systemId, signature);
    return newSig;
  }
}
