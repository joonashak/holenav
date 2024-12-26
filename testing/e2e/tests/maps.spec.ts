import { expect } from "@playwright/test";
import { test } from "../fixtures/fixtures";

test.beforeEach(async ({ page }) => {
  await page.goto("/system/J100001");
});

test("Create new map", async ({ map }) => {
  const name = await map.create();
  await expect(map.getMapControlButton()).toContainText(name);
});

test("Edit map name", async ({ map }) => {
  const name = await map.create();
  await map.getMapControlButton().click();
  await map.getEditButton(name).click();

  const newName = "Map all the things!";
  await map.getNameField().fill(newName);
  await map.getSaveButton().click();

  await expect(map.getMapList()).toContainText(newName);
});

test("Edit map root system", async ({ map }) => {
  const system1 = "J001769";
  const name = await map.create({ system: system1 });

  await map.getMapControlButton().click();
  await expect(map.getMapList()).toContainText(system1);

  const system2 = "J123454";
  await map.getEditButton(name).click();
  await map.selectRootSystem(system2);
  await map.getSaveButton().click();

  await expect(map.getMapList()).not.toContainText(system1);
  await expect(map.getMapList()).toContainText(system2);
});

test("Delete map", async ({ map }) => {
  const name = await map.create();
  await map.getMapControlButton().click();
  await map.getDeleteButton(name).click();
  await map.getConfirmDeleteButton().click();
  await expect(map.getMapList()).not.toContainText(name);
});
