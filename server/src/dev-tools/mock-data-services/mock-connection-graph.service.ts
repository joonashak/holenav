import { Injectable } from "@nestjs/common";
import { ConnectionGraphService } from "../../connection-graph/connection-graph.service";
import { FolderService } from "../../entities/folder/folder.service";
import { SignatureNode } from "../../entities/signature/neo/signature.node";
import { SystemNode } from "../../entities/signature/neo/system.node";
import { connections, connectedSystems, signatures } from "../data/connections";

@Injectable()
export class MockConnectionGraphService {
  constructor(
    private connectionGraphService: ConnectionGraphService,
    private systemNode: SystemNode,
    private signatureNode: SignatureNode,
    private folderService: FolderService,
  ) {}

  async mock() {
    // FIXME: Use signature service only.
    const folder = await this.folderService.getDefaultFolder();
    const systems = connectedSystems.map(({ name }) => ({ name, folderId: folder.id }));
    await this.systemNode.upsertSystems(systems);

    const sigs = signatures.map((s) => ({ ...s, id: s.eveId, name: s.eveId }));
    await this.signatureNode.createSignatures(sigs, folder.id);

    await this.connectionGraphService.createConnections(connections);
  }
}
