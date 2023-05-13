import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import {
  EsiAlliancePublicInfo,
  EsiCharacterPortraitUrl,
  EsiCharacterPublicInfo,
  EsiCorporationPublicInfo,
} from "./esi.types";

const baseUrl = "https://esi.evetech.net";

@Injectable()
export class EsiService {
  constructor(private httpService: HttpService) {}

  async getAlliancePublicInfo(allianceId: string) {
    return this.httpService.get<EsiAlliancePublicInfo>(this.url("v4", "alliances", allianceId));
  }

  async getCharacterPortraitUrl(characterId: string) {
    return this.httpService.get<EsiCharacterPortraitUrl>(
      this.url("v3", "characters", characterId, "portrait"),
    );
  }

  async getCharacterPublicInfo(characterId: string) {
    return this.httpService.get<EsiCharacterPublicInfo>(this.url("v5", "characters", characterId));
  }

  async getCorporationPublicInfo(corporationId: string) {
    return this.httpService.get<EsiCorporationPublicInfo>(
      this.url("v5", "corporations", corporationId),
    );
  }

  private url(...parts: string[]): string {
    return `${[baseUrl, ...parts].join("/")}/`;
  }
}
