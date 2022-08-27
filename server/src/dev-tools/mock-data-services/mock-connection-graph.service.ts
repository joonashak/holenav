import { Injectable } from "@nestjs/common";
import { ConnectionGraphService } from "../../connection-graph/connection-graph.service";
import { FolderService } from "../../entities/folder/folder.service";
import { SystemNode } from "../../entities/signature/neo/system.node";
import { connections, connectedSystems, signatures } from "../data/connections";

@Injectable()
export class MockConnectionGraphService {
  constructor(
    private connectionGraphService: ConnectionGraphService,
    private systemNode: SystemNode,
    private folderService: FolderService,
  ) {}

  async mock() {
    // FIXME: Use signature service only.
    const folder = await this.folderService.getDefaultFolder();
    const systems = connectedSystems.map(({ name }) => ({ name, folderId: folder.id }));
    const res = await this.systemNode.upsertSystems(systems);
    console.log(res);

    const sigs = signatures.map((sig) => ({ folderId: folder.id, ...sig }));
    await this.connectionGraphService.createSignatures(sigs);

    await this.connectionGraphService.createConnections(connections);
  }
}
