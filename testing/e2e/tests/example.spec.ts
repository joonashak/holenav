import { expect } from "@playwright/test";
import { test } from "../fixtures/fixtures";

test("has title", async ({ page }) => {
  await page.goto("");
  await expect(page.getByText("Welcome to Holenav!")).toBeVisible();
});

test("Create map", async ({ page, account }) => {
  const mapName = `E2E Map ${account.eveId}`;
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
