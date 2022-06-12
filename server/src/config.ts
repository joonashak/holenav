// TODO: Refactor these to capital case.
export const nodeEnv = process.env.NODE_ENV;
export const notProduction = nodeEnv !== "production";
export const databaseUrl = process.env.DATABASE_URL;
export const clientUrl = process.env.CLIENT_URL;
export const ssoCallbackUrl = process.env.SSO_CALLBACK_URL;
export const ssoClientId = process.env.SSO_CLIENT_ID;
export const ssoSecretKey = process.env.SSO_SECRET_KEY;
export const port = process.env.PORT || 3001;
export const jwtSecret = process.env.JWT_SECRET;
export const jwtLifetime = process.env.JWT_LIFETIME || "30d";
export const devToolsEnabled = process.env.ENABLE_DEVTOOLS === "true";
export const APP_VERSION = process.env.npm_package_version;
export const CLIENT_CD_TOKEN = process.env.CLIENT_CD_TOKEN;
export const CLIENT_CD_OWNER = process.env.CLIENT_CD_OWNER;
export const CLIENT_CD_REPO = process.env.CLIENT_CD_REPO;
export const CLIENT_CD_WORKFLOW_ID = process.env.CLIENT_CD_WORKFLOW_ID;

export const getClientLoginCallbackUrl = (state: string) => `${clientUrl}/login/${state}`;
