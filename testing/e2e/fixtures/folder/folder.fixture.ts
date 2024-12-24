import test from "@playwright/test";
import { Folder } from "./folder";

export const folderFixture = test.extend<{ folder: Folder }>({
  folder: async ({ page }, use) => {
    const folder = new Folder(page);
    await use(folder);
  },
});
