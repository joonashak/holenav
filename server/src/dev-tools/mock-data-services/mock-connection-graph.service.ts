import { Injectable } from "@nestjs/common";
import { FolderService } from "../../entities/folder/folder.service";
import { SignatureService } from "../../entities/signature/signature.service";
import { mainTestChain } from "../data/connections";

@Injectable()
export class MockConnectionGraphService {
  constructor(
    private folderService: FolderService,
    private signatureService: SignatureService,
  ) {}

  async mock() {
    const folder = await this.folderService.getDefaultFolder();
    await this.signatureService.createSignatures(mainTestChain, folder);
  }
}
