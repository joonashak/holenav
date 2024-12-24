import test from "@playwright/test";
import { Alert } from "./alert";

export const alertFixture = test.extend<{ alert: Alert }>({
  alert: async ({ page }, use) => {
    const alert = new Alert(page);
    await use(alert);
  },
});
