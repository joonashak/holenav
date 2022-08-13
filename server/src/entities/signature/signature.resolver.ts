import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { RequireFolderRole } from "../../auth/decorators/role.decorator";
import FolderRole from "../../user/roles/folder-role.enum";
import { ActiveFolderService } from "../folder/active-folder.service";
import AddSignaturesInput from "./dto/add-signature.dto";
import UpdateSignatureInput, { UpdateSignatureBatch } from "./dto/update-signature.dto";
import { Signature } from "./signature.model";
import { SignatureService } from "./signature.service";

@Resolver()
export class SignatureResolver {
  constructor(
    private sigService: SignatureService,
    private activeFolderService: ActiveFolderService,
  ) {}

  @RequireFolderRole(FolderRole.WRITE)
  @Mutation((returns) => [Signature])
  async addSignatures(@Args("input") input: AddSignaturesInput): Promise<Signature[]> {
    const sigs = this.activeFolderService.populateWithActiveFolder(input.signatures);
    console.log(sigs);
    return this.sigService.createSignatures(sigs);
  }

  @RequireFolderRole(FolderRole.WRITE)
  @Mutation((returns) => Signature)
  async updateSignature(@Args("input") input: UpdateSignatureInput): Promise<Signature> {
    const { id, ...update } = input;
    return this.sigService.updateSignature(id, update);
  }

  @RequireFolderRole(FolderRole.WRITE)
  @Mutation((returns) => Signature)
  async updateSignatures(@Args("input") input: UpdateSignatureBatch): Promise<Signature[]> {
    return this.sigService.updateSignatures(input.signatures);
  }

  @RequireFolderRole(FolderRole.WRITE)
  @Mutation((returns) => Signature)
  async deleteSignature(@Args("id") id: string): Promise<Signature> {
    return this.sigService.deleteSignature(id);
  }
}
