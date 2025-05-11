import { User } from "@joonashak/nestjs-clone-bay";
import { BadRequestException, Injectable } from "@nestjs/common";
import { ConnectionService } from "../../entities/connection/connection.service";
import { MapService } from "../../entities/map/map.service";
import { SignatureService } from "../../entities/signature/signature.service";
import { UserPreferencesService } from "../../user/user-preferences/user-preferences.service";
import { connectionGraphData } from "./connection-graph-data";

@Injectable()
export class ConnectionGraphDevToolsService {
  constructor(
    private userPreferencesService: UserPreferencesService,
    private signatureService: SignatureService,
    private connectionService: ConnectionService,
    private mapService: MapService,
  ) {}

  async reset(user: User) {
    await this.cleanUp(user);
    await this.generateConnectionGraph(user);
    return "OK";
  }

  private async cleanUp(user: User) {
    const activeFolder = await this.getActiveFolder(user);
    await this.signatureService.deleteByFolder(activeFolder.id);
    await this.connectionService.deleteByFolder(activeFolder.id);
    await this.mapService.deleteByUser(user);
  }

  private async getActiveFolder(user: User) {
    const { activeFolder } = await this.userPreferencesService.findByUserId(
      user.id,
    );
    if (!activeFolder) {
      throw new BadRequestException(
        "Active folder is not set. Cannot continue with connection graph generation.",
      );
    }
    return activeFolder;
  }

  private async generateConnectionGraph(user: User) {
    await Promise.all(
      connectionGraphData.map(async ({ name, rootSystemName, signatures }) => {
        await this.mapService.createMap({ name, rootSystemName }, user);
        const folder = await this.getActiveFolder(user);
        await this.signatureService.createSignatures(
          signatures,
          folder.id,
          user,
        );
      }),
    );
  }
}
