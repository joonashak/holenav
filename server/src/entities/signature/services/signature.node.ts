import { Injectable } from "@nestjs/common";
import { Neo4jService } from "../../../integration/neo4j/neo4j.service";
import SigType from "../enums/sig-type.enum";
import { Signature } from "../signature.model";

@Injectable()
export class SignatureNode {
  constructor(private neoService: Neo4jService) {}

  async findBySystem(params: { systemName: string; folderId: string }): Promise<Signature[]> {
    const res = await this.neoService.read(
      `
      MATCH (sig:Signature)<-[:HAS]-(:System {name: $systemName, folderId: $folderId})
      RETURN sig
    `,
      params,
    );
    const sigs = res.records.map((rec) => rec._fields[0].properties);

    //FIXME: Remove this.
    const paddedSigs = sigs.map((s) => ({
      name: "asd",
      type: SigType.UNKNOWN,
      systemName: params.systemName,
      ...s,
    }));

    return paddedSigs;
  }
}
