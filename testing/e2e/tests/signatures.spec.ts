import { expect } from "@playwright/test";
import { test } from "../fixtures/fixtures";

const id = "ASD-123";

test.beforeEach(async ({ folder, page }) => {
  await folder.create();
  await page.goto("/system/J100001");
});

test("Create an unknown signature", async ({ signature }) => {
  await signature.openSignatureModal();
  await signature.fillSignatureForm({ id });
  await signature.getSaveButton().click();

  await expect(signature.getSignatureList()).toContainText(id);
  await expect(signature.getSignatureList()).toContainText("unknown");
});

test("Create a data signature", async ({ signature }) => {
  await signature.openSignatureModal();
  await signature.fillSignatureForm({ id, type: "Data" });
  await signature.getSaveButton().click();

  await expect(signature.getSignatureList()).toContainText(id);
  await expect(signature.getSignatureList()).toContainText("data");
});

test("Create a relic signature", async ({ signature }) => {
  await signature.openSignatureModal();
  await signature.fillSignatureForm({ id, type: "Relic" });
  await signature.getSaveButton().click();

  await expect(signature.getSignatureList()).toContainText(id);
  await expect(signature.getSignatureList()).toContainText("relic");
});

test("Create a gas signature", async ({ signature }) => {
  await signature.openSignatureModal();
  await signature.fillSignatureForm({ id, type: "Gas" });
  await signature.getSaveButton().click();

  await expect(signature.getSignatureList()).toContainText(id);
  await expect(signature.getSignatureList()).toContainText("gas");
});

test("Alert is shown after adding a signature", async ({
  signature,
  alert,
}) => {
  await signature.openSignatureModal();
  await signature.fillSignatureForm({ id });
  await signature.getSaveButton().click();

  await expect(alert.getAlert()).toContainText("Signature added");
});
