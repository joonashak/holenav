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

test("Create unknown signature", async ({ page }) => {
  await page.goto("/system/J100001");
  await page.getByRole("button", { name: "Add Signature" }).click();
  await page.getByLabel("ID").fill("ASD-123");
  await page.getByRole("button", { name: "Save Signature" }).click();

  await expect(page.getByRole("alert")).toContainText("Signature added");
  await expect(
    page.getByRole("cell", { name: "ASD-123", exact: true }),
  ).toBeVisible();
});
