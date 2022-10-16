import { Injectable } from "@nestjs/common";
import { GraphSystem } from "../../../connection-graph/types";
import { Neo4jService } from "../../../integration/neo4j/neo4j.service";

@Injectable()
export class SystemNode {
  constructor(private neoService: Neo4jService) {}

  /**
   * Create systems in Neo4j if they don't already exist. Input data is not validated.
   * @param systems Systems to upsert.
   * @returns All given systems after upsert, regardless of whether they existed before.
   */
  async upsertSystems(systems: GraphSystem[]): Promise<GraphSystem[]> {
    if (!systems.length) {
      return;
    }

    const res = await this.neoService.write(
      `
        UNWIND $systems as system
        MERGE (s:System {
          name: system.name,
          folderId: system.folderId
        })
        ON CREATE SET
          s += system,
          s.id = apoc.create.uuid()
        RETURN s
      `,
      { systems },
    );

    return res.records.map((r) => r._fields[0].properties);
  }

  async findSystem(name: string, folderId: string) {
    const res = await this.neoService.read(
      `
        MATCH (system:System {
          name: $name,
          folderId: $folderId
        })
        RETURN system
      `,
      { name, folderId },
    );

    return res.records[0]._fields[0].properties;
  }
}
