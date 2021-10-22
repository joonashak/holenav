import { Args, Mutation, Resolver } from "@nestjs/graphql";
import AddSignatureInput from "./dto/addSignature.args";
import { Signature } from "./signature.model";
import { SignatureService } from "./signature.service";
import SigTypes from "./sigTypes.enum";

@Resolver()
export class SignatureResolver {
  constructor(private sigService: SignatureService) {}

  @Mutation((returns) => Signature)
  async addSignature(@Args("input") input: AddSignatureInput): Promise<Signature> {
    if (input.type === SigTypes.WORMHOLE) {
      throw new Error("Use addWormhole mutation for wormhole signatures.");
    }

    const { systemId, ...signature } = input;
    const newSig = await this.sigService.createSignature(systemId, signature);
    return newSig;
  }
}
