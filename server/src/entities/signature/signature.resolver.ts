import { RequireAuthentication } from "@joonashak/nestjs-clone-bay";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { FolderAction } from "../../access-control/folder/folder-role/folder-action.enum";
import { RequireFolderAccess } from "../../access-control/folder/require-folder-access.decorator";
import { AddSignaturesInput } from "./dto/add-signatures.dto";
import { DeleteSignaturesInput } from "./dto/delete-signatures.dto";
import {
  SignaturePaste,
  SignaturePasteResult,
} from "./dto/paste-signatures.dto";
import { UpdateSignaturesInput } from "./dto/update-signatures.dto";
import { SignaturePasteService } from "./signature-paste.service";
import { Signature } from "./signature.model";
import { SignatureService } from "./signature.service";

@RequireAuthentication()
@Resolver()
export class SignatureResolver {
  constructor(
    private sigService: SignatureService,
    private sigPasteService: SignaturePasteService,
  ) {}

  @RequireFolderAccess(FolderAction.Read)
  @Query(() => [Signature])
  async getSignaturesBySystem(
    @Args("systemName") systemName: string,
    @Args("folderId") folderId: string,
  ): Promise<Signature[]> {
    const signatures = await this.sigService.getBySystem(systemName, folderId);
    return signatures;
  }

  @RequireFolderAccess(FolderAction.Write)
  @Mutation(() => [Signature])
  async addSignatures(
    @Args("input") input: AddSignaturesInput,
    @Args("folderId") folderId: string,
  ): Promise<Signature[]> {
    const signatures = await this.sigService.createSignatures(
      input.signatures,
      folderId,
    );
    return signatures;
  }

  @RequireFolderAccess(FolderAction.Write)
  @Mutation(() => [Signature])
  async updateSignatures(
    @Args("input") input: UpdateSignaturesInput,
    @Args("folderId") folderId: string,
  ): Promise<Signature[]> {
    const signatures = await this.sigService.updateSignatures(
      input.signatures,
      folderId,
    );
    return signatures;
  }

  @RequireFolderAccess(FolderAction.Write)
  @Mutation(() => [Signature])
  async deleteSignatures(
    @Args("input") input: DeleteSignaturesInput,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Args("folderId") _folderId: string,
  ): Promise<Signature[]> {
    const signatures = await this.sigService.deleteSignatures(input.ids);
    return signatures;
  }

  @RequireFolderAccess(FolderAction.Write)
  @Mutation(() => SignaturePasteResult)
  async pasteSignatures(
    @Args("input") input: SignaturePaste,
    @Args("folderId") folderId: string,
  ): Promise<SignaturePasteResult> {
    return this.sigPasteService.applySignaturePaste(input, folderId);
  }
}
