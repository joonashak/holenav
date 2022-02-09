import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { RequireFolderRole } from "../../auth/decorators/role.decorator";
import FolderRoles from "../../user/folderRoles/folderRoles.enum";
import AddSignatureInput from "./dto/addSignature.dto";
import UpdateSignatureInput from "./dto/updateSignature.dto";
import { Signature } from "./signature.model";
import { SignatureService } from "./signature.service";
import SigTypes from "./sigTypes.enum";

@Resolver()
export class SignatureResolver {
  constructor(private sigService: SignatureService) {}

  @RequireFolderRole(FolderRoles.WRITE)
  @Mutation((returns) => Signature)
  async addSignature(@Args("input") input: AddSignatureInput): Promise<Signature> {
    if (input.type === SigTypes.WORMHOLE) {
      throw new Error("Use addWormhole mutation for wormhole signatures.");
    }

    const { systemId, ...signature } = input;
    const newSig = await this.sigService.createSignature(systemId, signature);
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
