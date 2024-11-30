import { authFixture } from "../auth.fixture";
import { Map } from "./map";

export const mapFixture = authFixture.extend<{ map: Map }>({
  map: async ({ page, account }, use) => {
    const map = new Map(page, account);
    await map.create();
    await use(map);
  },
});
