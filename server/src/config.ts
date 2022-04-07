export const nodeEnv = process.env.NODE_ENV;
export const databaseUrl = process.env.DATABASE_URL;
export const clientUrl = process.env.CLIENT_URL;
export const ssoCallbackUrl = process.env.SSO_CALLBACK_URL;
export const ssoClientId = process.env.SSO_CLIENT_ID;
export const ssoSecretKey = process.env.SSO_SECRET_KEY;
export const port = process.env.PORT || 3001;
export const jwtSecret = process.env.JWT_SECRET;
export const devToolsEnabled = process.env.ENABLE_DEVTOOLS === "true";

export const getClientLoginCallbackUrl = (state: string) => `${clientUrl}/login/${state}`;
