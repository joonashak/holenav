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

  private findChildren(
    allChildren: any[],
    currentSystemName: string,
    systemsInTree: string[] = [],
  ): ConnectionTreeNode[] {
    systemsInTree.push(currentSystemName);

    const children = allChildren
      .filter(
        (child) =>
          child.from.system.name === currentSystemName ||
          child.to.system.name === currentSystemName,
      )
      .map((child) => {
        const { connection, to, from } = child;
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

        const loop = systemsInTree.includes(system.name);

        return {
          name: loop ? `Loop to ${system.name}` : from.name,
          wormhole,
          signature,
          children: loop
            ? []
            : this.findChildren(
                allChildren.filter((c) => c.id !== child.id),
                system.name,
                systemsInTree,
              ),
        };
      });

    return children;
  }
}
