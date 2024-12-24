import { test } from "@playwright/test";

export type Account = {
  eveId: number;
  name: string;
};

export const authFixture = test.extend<{}, { account: Account }>({
  account: [
    async ({}, use, workerInfo) => {
      await use({
        eveId: workerInfo.workerIndex,
        name: `E2E User ${workerInfo.workerIndex}`,
      });
    },
    { scope: "worker" },
  ],

  page: async ({ page, request, account }, use) => {
    const { name, eveId } = account;

    await request.post("http://localhost:4001/clone-bay-mocking/create-user", {
      data: {
        main: {
          eveId,
          name,
          corporation: { eveId: 123, name: "Jotain", ticker: "JTN" },
          accessToken: "asd",
          refreshToken: "asd",
        },
        alts: [],
        admin: true,
      },
    });

    await page.goto(
      `http://localhost:4001/clone-bay-mocking/login?eveId=${eveId}`,
    );

    const folderName = `E2E Folder ${account.eveId}`;
    await page.goto("/system/J100001");
    await page.getByLabel("Open Settings Menu").click();
    await page.getByRole("menuitem", { name: "Folder Options" }).click();
    await page.getByRole("button", { name: "New Folder" }).click();
    await page.getByLabel("Name").fill(folderName);
    await page.getByRole("button", { name: "Create" }).click();
    await page.getByLabel("Active Folder").click();
    await page.getByRole("option", { name: folderName, exact: true }).click();

    await use(page);
  },
});
