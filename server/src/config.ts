export const NODE_ENV = process.env.NODE_ENV;
export const NOT_PRODUCTION = NODE_ENV !== "production";
export const DATABASE_URL = process.env.DATABASE_URL;
export const CLIENT_URL = process.env.CLIENT_URL;
export const SSO_CALLBACK_URL = process.env.SSO_CALLBACK_URL;
export const SSO_CLIENT_ID = process.env.SSO_CLIENT_ID;
export const SSO_SECRET_KEY = process.env.SSO_SECRET_KEY;
export const PORT = process.env.PORT || 3001;
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_LIFETIME = process.env.JWT_LIFETIME || "30d";
export const ENABLE_DEVTOOLS = process.env.ENABLE_DEVTOOLS === "true";
export const APP_VERSION =
  process.env.npm_package_version || process.env.APP_VERSION.replace("v", "");
export const CLIENT_CD_TOKEN = process.env.CLIENT_CD_TOKEN;
export const CLIENT_CD_OWNER = process.env.CLIENT_CD_OWNER;
export const CLIENT_CD_REPO = process.env.CLIENT_CD_REPO;
export const CLIENT_CD_WORKFLOW_ID = process.env.CLIENT_CD_WORKFLOW_ID;

export const getClientLoginCallbackUrl = (state: string) => `${CLIENT_URL}/login/${state}`;
