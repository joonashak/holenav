import { expect } from "@playwright/test";
import { test } from "../../fixtures/fixtures";

const id = "SIG-001";

test.beforeEach(async ({ folder, page, signature }) => {
  await folder.create();
  await page.goto("/system/J100001");
  await signature.openSignatureModal();
  await signature.fillSignatureForm({ id });
  await signature.getSaveButton().click();
});

test("Delete a signature", async ({ signature }) => {
  const id2 = "SIG-002";
  await signature.openSignatureModal();
  await signature.fillSignatureForm({ id: id2 });
  await signature.getSaveButton().click();

  await expect(signature.getSignatureList()).toContainText(id);
  await expect(signature.getSignatureList()).toContainText(id2);

  await signature.deleteSignature(id);

  await expect(signature.getSignatureList()).not.toContainText(id);
  await expect(signature.getSignatureList()).toContainText(id2);
});

test("Alert is shown after deleting", async ({ signature, alert }) => {
  await signature.deleteSignature(id);

  await expect(alert.getAlert()).toContainText("Signature deleted");
});
