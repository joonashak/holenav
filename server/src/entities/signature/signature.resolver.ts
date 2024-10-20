import { RequireAuthentication } from "@joonashak/nestjs-clone-bay";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { FolderAction } from "../../access-control/folder/folder-role/folder-action.enum";
import { RequireFolderAccess } from "../../access-control/folder/require-folder-access.decorator";
import { CreateSignature } from "./dto/add-signatures.dto";
import {
  SignaturePaste,
  SignaturePasteResult,
} from "./dto/paste-signatures.dto";
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

  @RequireAuthentication()
  @Mutation(() => [Signature])
  async createSignatures(
    @Args({ name: "signatures", type: () => [CreateSignature] })
    signatures: CreateSignature[],
  ): Promise<Signature[]> {
    console.log(signatures);
    return [];
  }

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
  @Mutation(() => SignaturePasteResult)
  async pasteSignatures(
    @Args("input") input: SignaturePaste,
    @Args("folderId") folderId: string,
  ): Promise<SignaturePasteResult> {
    return this.sigPasteService.applySignaturePaste(input, folderId);
  }
}
