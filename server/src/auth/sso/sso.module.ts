import { Module } from '@nestjs/common';
import { SsoService } from './sso.service';

@Module({
  providers: [SsoService]
})
export class SsoModule {}
