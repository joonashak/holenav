import { version } from "../package.json";

export const NODE_ENV = process.env.NODE_ENV;
export const NOT_PRODUCTION = NODE_ENV !== "production";
export const MONGO_URL = process.env.MONGO_URL;
export const NEO_URL = process.env.NEO_URL;
export const NEO_DB = process.env.NEO_DB;
export const NEO_USERNAME = process.env.NEO_USERNAME || "";
export const NEO_PASSWORD = process.env.NEO_PASSWORD || "";
export const CLIENT_URL = process.env.CLIENT_URL;
export const SSO_CALLBACK_URL = process.env.SSO_CALLBACK_URL;
export const SSO_CLIENT_ID = process.env.SSO_CLIENT_ID;
export const SSO_SECRET_KEY = process.env.SSO_SECRET_KEY;
export const PORT = process.env.PORT || 3001;
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_LIFETIME = process.env.JWT_LIFETIME || "30d";
export const ENABLE_DEVTOOLS = process.env.ENABLE_DEVTOOLS === "true";
export const APP_VERSION = version;
export const DEV_KEY = process.env.DEV_KEY;
export const HOST_FRONTEND = process.env.HOST_FRONTEND === "true";
export const SESSION_SECRET = process.env.SESSION_SECRET;

export const getClientLoginCallbackUrl = (state: string) =>
  `${CLIENT_URL}/login/${state}`;
