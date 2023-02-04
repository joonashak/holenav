import wormholes from "@eve-data/wormholes";
import { Injectable } from "@nestjs/common";
import { groupBy } from "lodash";
import { SignatureSearchService } from "./neo/signature-search.service";
import { SignatureService } from "./signature.service";

/**
 * Service for updating EOL statuses and removing old sigs.
 */
@Injectable()
export class SignatureMaintenanceService {
  constructor(
    private signatureService: SignatureService,
    private signatureSearchService: SignatureSearchService,
  ) {}

  // TODO: Performance should be recorded because of full-graph scans etc.
  async removeOldSignatures(): Promise<void> {
    const wormholesByLifetime = groupBy(wormholes, "lifetimeHrs");
    const asd = await this.signatureSearchService.findDeletable({
      type: "wormhole",
      minAgeHrs: 1,
      whTypes: ["B274"],
    });
    console.log(asd.records.map((r) => r._fields[0]));
  }
}
