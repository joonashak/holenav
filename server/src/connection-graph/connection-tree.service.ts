import { Injectable } from "@nestjs/common";
import { ConnectionGraphService } from "./connection-graph.service";
import { ConnectionTree, ConnectionTreeNode } from "./dto/connection-tree.dto";

@Injectable()
export class ConnectionTreeService {
  constructor(private connectionGraphService: ConnectionGraphService) {}

  async getConnectionTree(rootSystemName: string, folderId: string): Promise<ConnectionTree> {
    // Kudos to glilienfield for helping with this query:
    // https://community.neo4j.com/t5/neo4j-graph-platform/expand-sets-of-multiple-relations-when-querying-for-hierarchical/m-p/59381
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
        const reversed = to.system.name === currentSystemName;
        const system = reversed ? from.system : to.system;

        const wormhole = {
          ...connection,
          // FIXME: For testing.
          name: system.name,
          wormholeType: reversed ? connection.reverseType : connection.wormholeType,
          reverseType: reversed ? connection.wormholeType : connection.reverseType,
        };

        return {
          name: system.name,
          wormhole,
          children: this.findChildren(
            allChildren.filter((c) => c.id !== child.id),
            system.name,
          ),
        };
      });

    return children;
  }
}
