import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ActiveFolder } from "../../auth/decorators/active-folder.decorator";
import { RequireFolderRole } from "../../auth/decorators/role.decorator";
import FolderRole from "../../user/roles/folder-role.enum";
import { ActiveFolderService } from "../folder/active-folder.service";
import { Folder, FolderDocument } from "../folder/folder.model";
import { AddSignaturesInput } from "./dto/add-signatures.dto";
import { ConnectionTree } from "./dto/connection-tree.dto";
import { DeleteSignaturesInput } from "./dto/delete-signatures.dto";
import { UpdateSignaturesInput } from "./dto/update-signatures.dto";
import { ConnectionTreeService } from "./services/connection-tree.service";
import { SignatureService } from "./services/signature.service";
import { Signature } from "./signature.model";

@Resolver()
export class SignatureResolver {
  constructor(
    private sigService: SignatureService,
    private activeFolderService: ActiveFolderService,
    private connectionTreeService: ConnectionTreeService,
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
  @Mutation((returns) => [Signature])
  async addSignatures(@Args("input") input: AddSignaturesInput): Promise<Signature[]> {
    const sigs = this.activeFolderService.populateWithActiveFolder(input.signatures);
    const signatures = await this.sigService.createSignatures(sigs);
    return signatures;
  }

  @RequireFolderRole(FolderRole.WRITE)
  @Mutation((returns) => [Signature])
  async updateSignatures(@Args("input") input: UpdateSignaturesInput): Promise<Signature[]> {
    const sigs = this.activeFolderService.populateWithActiveFolder(input.signatures);
    const signatures = await this.sigService.updateSignatures(sigs);
    return signatures;
  }

  @RequireFolderRole(FolderRole.WRITE)
  @Mutation((returns) => [Signature])
  async deleteSignatures(@Args("input") input: DeleteSignaturesInput): Promise<Signature[]> {
    const signatures = await this.sigService.deleteSignatures(input.ids);
    return signatures;
  }

  @RequireFolderRole(FolderRole.READ)
  @Query((returns) => ConnectionTree)
  async getConnectionTree(
    @Args("rootSystem") rootSystemName: string,
    @ActiveFolder() activeFolder: FolderDocument,
  ): Promise<ConnectionTree> {
    return this.connectionTreeService.getConnectionTree(rootSystemName, activeFolder);
  }
}
