import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { RequireFolderRole } from "../../auth/decorators/role.decorator";
import FolderRole from "../../user/roles/folder-role.enum";
import { ActiveFolderService } from "../folder/active-folder.service";
import { AddSignaturesInput, AddSignaturesOutput } from "./dto/add-signatures.dto";
import { DeleteSignaturesInput, DeleteSignaturesOutput } from "./dto/delete-signatures.dto";
import { UpdateSignatureOutput, UpdateSignaturesInput } from "./dto/update-signatures.dto";
import { SignatureService } from "./signature.service";

@Resolver()
export class SignatureResolver {
  constructor(
    private sigService: SignatureService,
    private activeFolderService: ActiveFolderService,
  ) {}

  @RequireFolderRole(FolderRole.WRITE)
  @Mutation((returns) => [AddSignaturesOutput])
  async addSignatures(@Args("input") input: AddSignaturesInput): Promise<AddSignaturesOutput> {
    const sigs = this.activeFolderService.populateWithActiveFolder(input.signatures);
    const signatures = await this.sigService.createSignatures(sigs);
    return { signatures };
  }

  @RequireFolderRole(FolderRole.WRITE)
  @Mutation((returns) => [UpdateSignatureOutput])
  async updateSignatures(
    @Args("input") input: UpdateSignaturesInput,
  ): Promise<UpdateSignatureOutput> {
    const sigs = this.activeFolderService.populateWithActiveFolder(input.signatures);
    const signatures = await this.sigService.updateSignatures(sigs);
    return { signatures };
  }

  @RequireFolderRole(FolderRole.WRITE)
  @Mutation((returns) => DeleteSignaturesOutput)
  async deleteSignatures(
    @Args("input") input: DeleteSignaturesInput,
  ): Promise<DeleteSignaturesOutput> {
    const signatures = await this.sigService.deleteSignatures(input.ids);
    return { signatures };
  }
}
