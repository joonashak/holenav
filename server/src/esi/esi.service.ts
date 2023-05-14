import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { AxiosInstance } from "axios";
import {
  EsiAlliancePublicInfo,
  EsiCharacterPortraitUrl,
  EsiCharacterPublicInfo,
  EsiCorporationPublicInfo,
} from "./esi.types";

const baseUrl = "https://esi.evetech.net";

@Injectable()
export class EsiService {
  private axios: AxiosInstance;

  constructor(private httpService: HttpService) {
    this.axios = httpService.axiosRef;
  }

  async getAlliancePublicInfo(allianceId: string): Promise<EsiAlliancePublicInfo> {
    const url = this.url("v4", "alliances", allianceId);
    const res = await this.axios.get<EsiAlliancePublicInfo>(url);
    return res.data;
  }

  async getCharacterPortraitUrl(characterId: string): Promise<EsiCharacterPortraitUrl> {
    const url = this.url("v3", "characters", characterId, "portrait");
    const res = await this.axios.get<EsiCharacterPortraitUrl>(url);
    return res.data;
  }

  async getCharacterPublicInfo(characterId: string): Promise<EsiCharacterPublicInfo> {
    const url = this.url("v5", "characters", characterId);
    const res = await this.axios.get<EsiCharacterPublicInfo>(url);
    return res.data;
  }

  async getCorporationPublicInfo(corporationId: string): Promise<EsiCorporationPublicInfo> {
    const url = this.url("v5", "corporations", corporationId);
    const res = await this.axios.get<EsiCorporationPublicInfo>(url);
    return res.data;
  }

  private url(...parts: string[]): string {
    return `${[baseUrl, ...parts].join("/")}/`;
  }
}
