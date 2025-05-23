import {
  CurrentUser,
  RequireAuthentication,
  User,
} from "@joonashak/nestjs-clone-bay";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { FolderAction } from "../../access-control/folder/folder-role/folder-action.enum";
import { RequireFolderAccess } from "../../access-control/folder/require-folder-access.decorator";
import { CreateSignature } from "./dto/create-signature.dto";
import { FindSignature } from "./dto/find-signature.dto";
import {
  SignaturePaste,
  SignaturePasteResult,
} from "./dto/paste-signatures.dto";
import { UpdateSignature } from "./dto/update-signature.dto";
import { SignaturePasteService } from "./signature-paste.service";
import { Signature } from "./signature.model";
import { SignatureService } from "./signature.service";

@RequireAuthentication()
@Resolver()
export class SignatureResolver {
  constructor(
    private signatureService: SignatureService,
    private sigPasteService: SignaturePasteService,
  ) {}

  @RequireFolderAccess(FolderAction.Write)
  @Mutation(() => [Signature])
  async createSignatures(
    @Args({ name: "signatures", type: () => [CreateSignature] })
    signatures: CreateSignature[],
    @Args("folderId") folderId: string,
    @CurrentUser() user: User,
  ): Promise<Signature[]> {
    return this.signatureService.createSignatures(signatures, folderId, user);
  }

  @RequireFolderAccess(FolderAction.Read)
  @Query(() => [FindSignature])
  async findSignaturesBySystem(
    @Args("systemName") systemName: string,
    @Args("folderId") folderId: string,
  ): Promise<FindSignature[]> {
    return this.signatureService.findBySystem(systemName, folderId);
  }

  @RequireFolderAccess(FolderAction.Write)
  @Mutation(() => [FindSignature])
  async updateSignatures(
    @Args({ name: "updates", type: () => [UpdateSignature] })
    updates: UpdateSignature[],
    @Args("folderId") folderId: string,
    @CurrentUser() user: User,
  ): Promise<FindSignature[]> {
    return this.signatureService.updateSignatures(updates, folderId, user);
  }

  @RequireFolderAccess(FolderAction.Write)
  @Mutation(() => [FindSignature])
  async removeSignatures(
    @Args({ name: "signatureIds", type: () => [String] })
    signatureIds: string[],
    @Args("folderId") folderId: string,
  ): Promise<FindSignature[]> {
    return this.signatureService.deleteSignatures(signatureIds, folderId);
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
