import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { RequireFolderRole } from "../../auth/decorators/role.decorator";
import FolderRoles from "../../user/roles/folder-roles.enum";
import AddSignatureInput from "./dto/add-signature.dto";
import UpdateSignatureInput, { UpdateSignatureBatch } from "./dto/update-signature.dto";
import { Signature } from "./signature.model";
import { SignatureService } from "./signature.service";

@Resolver()
export class SignatureResolver {
  constructor(private sigService: SignatureService) {}

  @RequireFolderRole(FolderRoles.WRITE)
  @Mutation((returns) => [Signature])
  async addSignatures(@Args("input") input: AddSignatureInput): Promise<Signature[]> {
    const { systemId, signatures } = input;
    const newSig = await this.sigService.createSignatures(systemId, signatures);
    return newSig;
  }

  @RequireFolderRole(FolderRoles.WRITE)
  @Mutation((returns) => Signature)
  async updateSignature(@Args("input") input: UpdateSignatureInput): Promise<Signature> {
    const { id, ...update } = input;
    return this.sigService.updateSignature(id, update);
  }

  @RequireFolderRole(FolderRoles.WRITE)
  @Mutation((returns) => Signature)
  async updateSignatures(@Args("input") input: UpdateSignatureBatch): Promise<Signature[]> {
    return this.sigService.updateSignatures(input.signatures);
  }

  @RequireFolderRole(FolderRoles.WRITE)
  @Mutation((returns) => Signature)
  async deleteSignature(@Args("id") id: string): Promise<Signature> {
    return this.sigService.deleteSignature(id);
  }
}
