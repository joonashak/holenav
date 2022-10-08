import { Injectable } from "@nestjs/common";
import { ConnectionGraphService } from "../../connection-graph/connection-graph.service";
import { FolderService } from "../../entities/folder/folder.service";
import { SignatureMutationService } from "../../entities/signature/neo/signature-mutation.service";
import { SystemNode } from "../../entities/signature/neo/system.node";
import { connections, connectedSystems, signatures } from "../data/connections";

@Injectable()
export class MockConnectionGraphService {
  constructor(
    private connectionGraphService: ConnectionGraphService,
    private systemNode: SystemNode,
    private folderService: FolderService,
    private signatureMutationService: SignatureMutationService,
  ) {}

  async mock() {
    // FIXME: Use signature service only.
    const folder = await this.folderService.getDefaultFolder();
    const systems = connectedSystems.map(({ name }) => ({ name, folderId: folder.id }));
    await this.systemNode.upsertSystems(systems);

    const sigs = signatures.map((s) => ({ ...s, id: s.eveId, name: s.eveId }));
    await this.signatureMutationService.createSignatures(sigs, folder.id);

    await this.connectionGraphService.createConnections(connections);
  }
}
