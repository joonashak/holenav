import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { RequireFolderRole } from "../../auth/decorators/role.decorator";
import FolderRoles from "../../user/roles/folder-roles.enum";
import AddSignatureInput from "./dto/add-signature.dto";
import UpdateSignatureInput from "./dto/update-signature.dto";
import { Signature } from "./signature.model";
import { SignatureService } from "./signature.service";
import SigTypes from "./sig-types.enum";

@Resolver()
export class SignatureResolver {
  constructor(private sigService: SignatureService) {}

  @RequireFolderRole(FolderRoles.WRITE)
  @Mutation((returns) => [Signature])
  async addSignature(@Args("input") input: AddSignatureInput): Promise<Signature[]> {
    const includesWormholes = input.signatures.find((sig) => sig.type === SigTypes.WORMHOLE);
    if (includesWormholes) {
      throw new Error("Use addWormhole mutation for wormhole signatures.");
    }

    const { systemId, signatures } = input;
    const newSig = await this.sigService.createSignatures(systemId, signatures);
    console.log(newSig);
    return newSig;
  }

  @RequireFolderRole(FolderRoles.WRITE)
  @Mutation((returns) => Signature)
  async updateSignature(@Args("input") input: UpdateSignatureInput): Promise<Signature> {
    if (input.type === SigTypes.WORMHOLE) {
      throw new Error("Use updateWormhole mutation for wormhole signatures.");
    }

    const { id, ...update } = input;
    return this.sigService.updateSignature(id, update);
  }

  @RequireFolderRole(FolderRoles.WRITE)
  @Mutation((returns) => Signature)
  async deleteSignature(@Args("id") id: string): Promise<Signature> {
    return this.sigService.deleteSignature(id);
  }
}
