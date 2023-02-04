import wormholes from "@eve-data/wormholes";
import { Injectable } from "@nestjs/common";
import { SignatureSearchService } from "./neo/signature-search.service";
import { Signature } from "./signature.model";
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
  // TODO: Remove eol holes based on eolAt!
  async removeOldSignatures(): Promise<void> {
    const typesByLifetime = wormholes.reduce(
      (res, val) => {
        if (!res[val.lifetimeHrs]) {
          res[val.lifetimeHrs] = [];
        }
        res[val.lifetimeHrs].push(val.type);
        return res;
      },
      { "48": ["K162", ""] },
    );

    for (const [lifetime, whTypes] of Object.entries(typesByLifetime)) {
      await this.removeOldWormholes(Number(lifetime), whTypes);
    }

    await this.removeOldNonWhSigs();
  }

  private async removeOldWormholes(lifetime: number, whTypes: string[]): Promise<void> {
    // +10% lifetime variance and a little bit of slack.
    const minAgeHrs = lifetime * 1.1 + 0.2;
    const oldWormholes = await this.signatureSearchService.findByQuery({
      type: "wormhole",
      minAgeHrs,
      whTypes,
    });

    const oldEolWormholes = await this.signatureSearchService.findByQuery({
      type: "wormhole",
      eol: true,
      minEolAgeHrs: 4.5,
    });

    const deletableIds = this.getDeletableIds(oldWormholes.concat(oldEolWormholes));
    await this.signatureService.deleteSignatures(deletableIds);
  }

  private async removeOldNonWhSigs(): Promise<void> {
    // Remove after a week.
    const minAgeHrs = 24 * 7;
    const oldSigs = await this.signatureSearchService.findByQuery({ type: "other", minAgeHrs });
    await this.signatureService.deleteSignatures(oldSigs.map((sig) => sig.id));
  }

  /**
   * Remove duplicate ID's so we don't try to remove both sides of connection.
   */
  private getDeletableIds(signatures: Signature[]): string[] {
    return [...new Set(signatures.map((sig) => sig.id))];
  }
}
