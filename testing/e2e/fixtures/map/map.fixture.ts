import test from "@playwright/test";
import { Map } from "./map";

export const mapFixture = test.extend<{ map: Map }>({
  map: async ({ page }, use) => {
    const map = new Map(page);
    await map.create();
    await use(map);
  },
});
