import { Args, Mutation, Resolver } from "@nestjs/graphql";
import AddSignatureArgs from "./dto/addSignature.args";
import { Signature } from "./signature.model";
import { SignatureService } from "./signature.service";
import SigTypes from "./sigTypes.enum";

@Resolver()
export class SignatureResolver {
  constructor(private sigService: SignatureService) {}

  @Mutation((returns) => Signature)
  async addSignature(@Args() args: AddSignatureArgs): Promise<Signature> {
    if (args.type === SigTypes.WORMHOLE) {
      throw new Error("Use addWormhole mutation for wormhole signatures.");
    }

    const { systemId, ...signature } = args;
    const newSig = await this.sigService.createSignature(systemId, signature);
    return newSig;
  }
}
