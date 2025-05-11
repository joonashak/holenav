import { Module } from "@nestjs/common";
import { ConnectionModule } from "../../entities/connection/connection.module";
import { SignatureModule } from "../../entities/signature/signature.module";
import { UserPreferencesModule } from "../../user/user-preferences/user-preferences.module";
import { ConnectionGraphDevToolsService } from "./connection-graph-dev-tools.service";

@Module({
  imports: [UserPreferencesModule, SignatureModule, ConnectionModule],
  providers: [ConnectionGraphDevToolsService],
  exports: [ConnectionGraphDevToolsService],
})
export class ConnectionGraphDevToolsModule {}
