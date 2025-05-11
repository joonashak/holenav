import { expect } from "@playwright/test";
import { test } from "../fixtures/fixtures";

// Smoke test for dev tools. Maybe temporary?
test("Dev tools work", async ({ page }) => {
  await page.goto("/system/Jita");
  await expect(page.getByText("DSAData")).toBeVisible();
  await expect(page.getByText("FFFC140hole")).toBeVisible();
});
