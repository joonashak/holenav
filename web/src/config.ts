export const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const devToolsEnabled = import.meta.env.VITE_ENABLE_DEVTOOLS === "true";

export const endpoints = {
  graphQl: `${backendUrl}/graphql`,
  dev: {
    reset: `${backendUrl}/dev/reset`,
  },
};

export const pollIntervalSec = 5;
