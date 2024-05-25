export const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const devToolsEnabled = process.env.REACT_APP_ENABLE_DEVTOOLS === "true";

export const endpoints = {
  graphQl: `${backendUrl}/graphql`,
  dev: {
    reset: `${backendUrl}/dev/reset`,
    seed: `${backendUrl}/dev/seed`,
    mockUsers: `${backendUrl}/dev/mockUsers`,
  },
};

export const pollIntervalSec = 5;
