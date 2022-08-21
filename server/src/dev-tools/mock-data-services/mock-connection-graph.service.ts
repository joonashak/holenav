import { Injectable } from "@nestjs/common";
import { ConnectionGraphService } from "../../connection-graph/connection-graph.service";
import { FolderService } from "../../entities/folder/folder.service";
import { connections, connectedSystems, signatures } from "../data/connections";

@Injectable()
export class MockConnectionGraphService {
  constructor(
    private connectionGraphService: ConnectionGraphService,
    private folderService: FolderService,
  ) {}

  async mock() {
    const folder = await this.folderService.getDefaultFolder();
    const systems = connectedSystems.map(({ name }) => ({ name, folderId: folder.id }));
    await this.connectionGraphService.createSystems(systems);

    const sigs = signatures.map((sig) => ({ folderId: folder.id, ...sig }));
    await this.connectionGraphService.createSignatures(sigs);

    await this.connectionGraphService.createConnections(connections);
  }
}
