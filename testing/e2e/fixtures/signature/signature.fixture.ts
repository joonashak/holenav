import test from "@playwright/test";
import { Signature } from "./signature";

export const signatureFixture = test.extend<{ signature: Signature }>({
  signature: async ({ page }, use) => {
    const sig = new Signature(page);
    await use(sig);
  },
});
