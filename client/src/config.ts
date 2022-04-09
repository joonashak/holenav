export const cmsUrl = process.env.REACT_APP_CMS_URL;

export const devToolsEnabled = process.env.REACT_APP_ENABLE_DEVTOOLS === "true";

// FIXME: Remove unnecessary endpoints after auth refactor.
export const endpoints = {
  graphQl: `${cmsUrl}/graphql`,
  getToken: `${cmsUrl}/auth/getToken`,
  login: `${cmsUrl}/auth/login`,
  logout: `${cmsUrl}/auth/logout`,
  addCharacter: `${cmsUrl}/auth/addCharacter`,
  dev: {
    reset: `${cmsUrl}/dev/reset`,
    seed: `${cmsUrl}/dev/seed`,
    mockUsers: `${cmsUrl}/dev/mockUsers`,
  },
};

export const pollIntervalSec = 5;
