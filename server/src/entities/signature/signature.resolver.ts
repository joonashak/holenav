import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ActiveFolder } from "../../auth/decorators/active-folder.decorator";
import { RequireFolderRole } from "../../auth/decorators/role.decorator";
import FolderRole from "../../user/roles/folder-role.enum";
import { ActiveFolderService } from "../folder/active-folder.service";
import { Folder, FolderDocument } from "../folder/folder.model";
import { AddSignaturesInput, AddSignaturesOutput } from "./dto/add-signatures.dto";
import { ConnectionTree } from "./dto/connection-tree.dto";
import { DeleteSignaturesInput, DeleteSignaturesOutput } from "./dto/delete-signatures.dto";
import { GetSignaturesOutput } from "./dto/get-signatures.dto";
import { UpdateSignatureOutput, UpdateSignaturesInput } from "./dto/update-signatures.dto";
import { ConnectionTreeService } from "./services/connection-tree.service";
import { SignatureService } from "./services/signature.service";

@Resolver()
export class SignatureResolver {
  constructor(
    private sigService: SignatureService,
    private activeFolderService: ActiveFolderService,
    private connectionTreeService: ConnectionTreeService,
  ) {}

  @RequireFolderRole(FolderRole.READ)
  @Query((returns) => GetSignaturesOutput)
  async getSignaturesBySystem(
    @Args("systemName") systemName: string,
    @ActiveFolder() activeFolder: Folder,
  ): Promise<GetSignaturesOutput> {
    const signatures = await this.sigService.getBySystem(systemName, activeFolder);
    return { signatures };
  }

  @RequireFolderRole(FolderRole.WRITE)
  @Mutation((returns) => AddSignaturesOutput)
  async addSignatures(@Args("input") input: AddSignaturesInput): Promise<AddSignaturesOutput> {
    const sigs = this.activeFolderService.populateWithActiveFolder(input.signatures);
    const signatures = await this.sigService.createSignatures(sigs);
    return { signatures };
  }

  @RequireFolderRole(FolderRole.WRITE)
  @Mutation((returns) => UpdateSignatureOutput)
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

  @RequireFolderRole(FolderRole.READ)
  @Query((returns) => ConnectionTree)
  async getConnectionTree(
    @Args("rootSystem") rootSystemName: string,
    @ActiveFolder() activeFolder: FolderDocument,
  ): Promise<ConnectionTree> {
    return this.connectionTreeService.getConnectionTree(rootSystemName, activeFolder);
  }
}
