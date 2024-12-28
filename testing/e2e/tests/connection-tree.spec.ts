import { expect } from "@playwright/test";
import { test } from "../fixtures/fixtures";

const mapName = "Nice map";
const rootSystem = "J100001";
const id = "ZXC-213";

test.beforeEach(async ({ page, map, folder, signature }) => {
  await page.goto("/system/J100001");
  await folder.create();
  await map.create({ name: mapName, system: rootSystem });

  await signature.openSignatureModal();
  await signature.fillSignatureForm({
    id,
    type: "Wormhole",
    destination: "J170002",
  });
  await signature.getSaveButton("wormhole").click();
});

test("Root node shows map name", async ({ page }) => {
  await expect(page.getByLabel("Connection tree")).toContainText(mapName);
});

test("Connection is shown", async ({ page }) => {
  await expect(page.getByLabel("Connection tree")).toContainText("J170002");
});

test("Removed connection is not shown", async ({ page, signature }) => {
  await signature.deleteSignature(id);
  await expect(page.getByLabel("Connection tree")).not.toContainText("J170002");
});

// TODO: Test that changing map changes shown connection tree root.
