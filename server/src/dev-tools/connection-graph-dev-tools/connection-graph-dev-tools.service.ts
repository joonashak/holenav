import { User } from "@joonashak/nestjs-clone-bay";
import { BadRequestException, Injectable } from "@nestjs/common";
import { ConnectionService } from "../../entities/connection/connection.service";
import { Folder } from "../../entities/folder/folder.model";
import { SignatureService } from "../../entities/signature/signature.service";
import { UserPreferencesService } from "../../user/user-preferences/user-preferences.service";

@Injectable()
export class ConnectionGraphDevToolsService {
  constructor(
    private userPreferencesService: UserPreferencesService,
    private signatureService: SignatureService,
    private connectionService: ConnectionService,
  ) {}

  async generateAndSave(user: User) {
    const activeFolder = await this.getActiveFolder(user);
    await this.cleanUp(activeFolder);
    // TODO: Save new sigs and connections.
    return "OK";
  }

  private async cleanUp(folder: Folder) {
    await this.signatureService.deleteByFolder(folder.id);
    await this.connectionService.deleteByFolder(folder.id);
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
}
