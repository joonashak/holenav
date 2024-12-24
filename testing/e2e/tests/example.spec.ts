import { expect } from "@playwright/test";
import { test } from "../fixtures/fixtures";

test("has title", async ({ page }) => {
  await page.goto("");
  await expect(page.getByText("Welcome to Holenav!")).toBeVisible();
});

test("Create map", async ({ map }) => {
  map.asd();
});

test("test if map fixture breaks", async ({ map }) => {
  map.asd();
});
