import { Injectable } from "@nestjs/common";
import { FolderService } from "../../entities/folder/folder.service";
import { MockService } from "./mock-service.interface";

@Injectable()
export class MockFolderService implements MockService {
  constructor(private folderService: FolderService) {}

  async mock() {
    await this.folderService.createFolder({
      name: "Default Folder",
      id: "default",
    });
    await this.folderService.createFolder({ name: "Test Folder" });
  }
}
