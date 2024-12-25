import { expect } from "@playwright/test";
import { test } from "../../fixtures/fixtures";

const id = "DSA-456";

test.beforeEach(async ({ folder, signature, page }) => {
  await folder.create();
  await page.goto("/system/J100001");
  await signature.openSignatureModal();
  await signature.fillSignatureForm({ id });
  await signature.getSaveButton().click();
});

test("Change signature ID", async ({ signature }) => {
  const newId = "QWE-000";
  await signature.openSignatureModal(id);
  await signature.fillSignatureForm({ id: newId });
  await signature.getSaveButton().click();

  await expect(signature.getSignatureList()).toContainText(newId);
});

test("Change signature type", async ({ signature }) => {
  await signature.openSignatureModal(id);
  await signature.fillSignatureForm({ type: "Gas" });
  await signature.getSaveButton().click();

  await expect(signature.getSignatureList()).toContainText("gas");
});

test("Change signature name", async ({ signature }) => {
  const name = "rickrolled";
  await signature.openSignatureModal(id);
  await signature.fillSignatureForm({ name });
  await signature.getSaveButton().click();

  await expect(signature.getSignatureList()).toContainText(name);
});

test("Alert is shown after editing", async ({ signature, alert }) => {
  await signature.openSignatureModal(id);
  await signature.fillSignatureForm({ type: "Gas" });
  await signature.getSaveButton().click();

  await expect(alert.getAlert()).toContainText("Signature updated");
});
