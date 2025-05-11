import { expect } from "@playwright/test";
import { test } from "../fixtures/fixtures";

// Smoke test for dev tools. Maybe temporary?
test("Dev tools work", async ({ page }) => {
  await page.goto("/system/J111141");
  await expect(page.getByText("NOW-820D382D2A")).toBeVisible();
  await expect(page.getByText("OAS-842A239ALA")).toBeVisible();
});
