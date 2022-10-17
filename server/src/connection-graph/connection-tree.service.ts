import { Injectable } from "@nestjs/common";
import { ConnectionGraphService } from "./connection-graph.service";
import { ConnectionTree, ConnectionTreeNode } from "./dto/connection-tree.dto";

@Injectable()
export class ConnectionTreeService {
  constructor(private connectionGraphService: ConnectionGraphService) {}

  async getConnectionTree(rootSystemName: string, folderId: string): Promise<ConnectionTree> {
    const records = await this.connectionGraphService.getConnectionGraph(rootSystemName, folderId);
    const connections = records.map((record) => ({ ...record._fields[0] }));
    const connectionTree = this.buildConnectionTree(rootSystemName, connections);

    return connectionTree;
  }

  private buildConnectionTree(rootSystemName: string, connections: any[]) {
    const connectionTree = {
      rootSystemName,
      children: this.findChildren(connections, rootSystemName),
    };
    return connectionTree;
  }

  private findChildren(allChildren: any[], currentSystemName: string): ConnectionTreeNode[] {
    // TODO: Make sure this stops on loop.
    const children = allChildren
      .filter(
        (child) =>
          child.from.system.name === currentSystemName ||
          child.to.system.name === currentSystemName,
      )
      .map((child) => {
        const { connection, to, from } = child;
        // FIXME: This will not work for K162 (reversed) holes without destination system name.
        const reversed = to.system.name === currentSystemName;
        const signature = reversed ? to : from;
        const system = reversed ? from.system : to.system;

        const wormhole = {
          ...connection,
          destinationName: system.name,
          unknownDestination: system.pseudo,
          wormholeType: reversed ? connection.reverseType : connection.wormholeType,
          reverseType: reversed ? connection.wormholeType : connection.reverseType,
        };

        return {
          name: from.name,
          wormhole,
          signature,
          children: this.findChildren(
            allChildren.filter((c) => c.id !== child.id),
            system.name,
          ),
        };
      });

    return children;
  }
}
