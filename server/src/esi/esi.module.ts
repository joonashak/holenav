import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { EsiService } from "./esi.service";

@Module({
  imports: [HttpModule],
  providers: [EsiService],
  exports: [EsiService, HttpModule],
})
export class EsiModule {}
