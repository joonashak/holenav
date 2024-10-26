import { CloneBayModuleOptions } from "@joonashak/nestjs-clone-bay";
import { EveAuthModuleOptions } from "@joonashak/nestjs-eve-auth";

export const getEveAuthMockingOptions = () => {
  if (process.env.NODE_ENV !== "development") {
    return {};
  }

  const opt: Partial<EveAuthModuleOptions> = {};

  if (process.env.AUTHORIZATION_URL) {
    opt.authorizationUrl = process.env.AUTHORIZATION_URL;
  }
  if (process.env.TOKEN_URL) {
    opt.tokenUrl = process.env.TOKEN_URL;
  }
  if (process.env.VERIFY_URL) {
    opt.verifyUrl = process.env.VERIFY_URL;
  }

  return opt;
};

export const getCloneBayMockingOptions = () => {
  if (process.env.NODE_ENV !== "development") {
    return {};
  }

  const opt: Partial<CloneBayModuleOptions> = {};

  if (process.env.ESI_BASE_URL) {
    opt.esiBaseUrl = process.env.ESI_BASE_URL;
  }

  return opt;
};
