import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { RequireFolderRole } from "../../auth/decorators/role.decorator";
import FolderRole from "../../user/roles/folder-role.enum";
import { ActiveFolderService } from "../folder/active-folder.service";
import { AddSignaturesInput } from "./dto/add-signature.dto";
import { UpdateSignaturesInput } from "./dto/update-signature.dto";
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
    return this.sigService.createSignatures(sigs);
  }

  @RequireFolderRole(FolderRole.WRITE)
  @Mutation((returns) => [Signature])
  async updateSignatures(@Args("input") input: UpdateSignaturesInput): Promise<Signature[]> {
    const sigs = this.activeFolderService.populateWithActiveFolder(input.signatures);
    return this.sigService.updateSignatures(sigs);
  }

  @RequireFolderRole(FolderRole.WRITE)
  @Mutation((returns) => Signature)
  async deleteSignature(@Args("id") id: string): Promise<Signature> {
    return this.sigService.deleteSignature(id);
  }
}
