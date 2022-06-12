import { Injectable } from "@nestjs/common";
import { FolderService } from "../../entities/folder/folder.service";
import { MockService } from "./mock-service.interface";

@Injectable()
export class MockFolderService implements MockService {
  constructor(private folderService: FolderService) {}

  async mock() {
    await this.folderService.createFolderWithOptionalId("Default Folder", "default");
    await this.folderService.createFolderWithOptionalId("Test Folder");
  }
}
