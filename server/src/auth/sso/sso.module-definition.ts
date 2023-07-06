import { ConfigurableModuleBuilder } from "@nestjs/common";

export interface SsoModuleConfig {
  scopes: string[];
}

export const {
  ConfigurableModuleClass: ConfigurableSsoModule,
  MODULE_OPTIONS_TOKEN: SSO_MODULE_CONFIG_TOKEN,
} = new ConfigurableModuleBuilder<SsoModuleConfig>().build();
