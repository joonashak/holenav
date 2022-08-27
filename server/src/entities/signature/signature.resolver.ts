import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ActiveFolder } from "../../auth/decorators/active-folder.decorator";
import { RequireFolderRole } from "../../auth/decorators/role.decorator";
import FolderRole from "../../user/roles/folder-role.enum";
import { ActiveFolderService } from "../folder/active-folder.service";
import { Folder } from "../folder/folder.model";
import { AddSignaturesInput } from "./dto/add-signatures.dto";
import { DeleteSignaturesInput } from "./dto/delete-signatures.dto";
import { UpdateSignaturesInput } from "./dto/update-signatures.dto";
import { SignatureService } from "./services/signature.service";
import { SignatureOLD } from "./signature-OLD.model";
import { Signature } from "./signature.model";

@Resolver()
export class SignatureResolver {
  constructor(
    private sigService: SignatureService,
    private activeFolderService: ActiveFolderService,
  ) {}

  @RequireFolderRole(FolderRole.READ)
  @Query((returns) => [Signature])
  async getSignaturesBySystem(
    @Args("systemName") systemName: string,
    @ActiveFolder() activeFolder: Folder,
  ): Promise<Signature[]> {
    const signatures = await this.sigService.getBySystem(systemName, activeFolder);
    return signatures;
  }

  @RequireFolderRole(FolderRole.WRITE)
  @Mutation((returns) => [SignatureOLD])
  async addSignatures(@Args("input") input: AddSignaturesInput): Promise<SignatureOLD[]> {
    const sigs = this.activeFolderService.populateWithActiveFolder(input.signatures);
    const signatures = await this.sigService.createSignatures(sigs);
    return signatures;
  }

  @RequireFolderRole(FolderRole.WRITE)
  @Mutation((returns) => [SignatureOLD])
  async updateSignatures(@Args("input") input: UpdateSignaturesInput): Promise<SignatureOLD[]> {
    const sigs = this.activeFolderService.populateWithActiveFolder(input.signatures);
    const signatures = await this.sigService.updateSignatures(sigs);
    return signatures;
  }

  @RequireFolderRole(FolderRole.WRITE)
  @Mutation((returns) => [SignatureOLD])
  async deleteSignatures(@Args("input") input: DeleteSignaturesInput): Promise<SignatureOLD[]> {
    const signatures = await this.sigService.deleteSignatures(input.ids);
    return signatures;
  }
}
