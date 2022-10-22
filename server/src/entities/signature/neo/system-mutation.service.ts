import { Injectable } from "@nestjs/common";
import { isEqual, uniqWith } from "lodash";
import { Neo4jService } from "../../../integration/neo4j/neo4j.service";
import { addUuid } from "../../../utils/addUuid";
import uuid from "../../../utils/uuid";
import { SignatureWithoutConnection } from "../signature.model";
import { SystemNode } from "./graph-types";

@Injectable()
export class SystemMutationService {
  constructor(private neoService: Neo4jService) {}

  /**
   * Create systems in Neo4j if they don't already exist. Input data is not validated.
   * @param systems Systems to upsert.
   * @returns All given systems after upsert, regardless of whether they existed before.
   */
  async upsertSystems(systems: SystemNode[]): Promise<SystemNode[]> {
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
          s.id = system.id
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

  /**
   * Remove all pseudo-systems that have no relations attached to them.
   */
  async removeDanglingPseudoSystems(): Promise<number> {
    const res = await this.neoService.write(`
      MATCH (system:System {pseudo: true})
      WHERE NOT (system)--()
      DELETE system
    `);

    return res.summary.updateStatistics._stats.nodesDeleted;
  }

  async ensureSystemsExist(signatures: SignatureWithoutConnection[], folderId: string) {
    const systems = signatures.map(this.systemFromSignature(folderId));
    const uniqueSystems = uniqWith(systems, isEqual);
    await this.upsertSystems(uniqueSystems);
  }

  private systemFromSignature =
    (folderId: string) =>
    (signature: SignatureWithoutConnection): SystemNode => {
      const pseudo = !!signature.systemName;
      const name = pseudo ? signature.systemName : uuid();

      return addUuid({
        name,
        pseudo,
        folderId,
      });
    };
}
