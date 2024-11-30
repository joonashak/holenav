import { expect, test } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("");
  await expect(page.getByText("Welcome to Holenav!")).toBeVisible();
});

test("Create folder", async ({ page, request }) => {
  await request.post("http://localhost:4001/clone-bay-mocking/create-user", {
    data: {
      main: {
        eveId: test.info().workerIndex,
        name: `E2E User ${test.info().workerIndex}`,
        corporation: { eveId: 123, name: "Jotain", ticker: "JTN" },
        accessToken: "asd",
        refreshToken: "asd",
      },
      alts: [],
      admin: true,
    },
  });

  await page.goto(
    `http://localhost:4001/clone-bay-mocking/login?eveId=${test.info().workerIndex}`,
  );

  const mapName = `E2E Map ${test.info().workerIndex}`;
  await page.goto("/system/J104809");
  await page.getByRole("button", { name: "Select active map" }).click();
  await page.getByRole("menuitem", { name: "New Map" }).click();
  await page.getByLabel("Name").fill(mapName);
  await page.getByLabel("Root System").fill("J100001");
  await page.getByRole("option", { name: "J100001", exact: true }).click();
  await page.getByRole("button", { name: "Save" }).click();
  await page.getByRole("menuitem", { name: mapName }).click();

  await expect(
    page.getByRole("button", { name: "Select active map" }),
  ).toContainText(mapName);
});
