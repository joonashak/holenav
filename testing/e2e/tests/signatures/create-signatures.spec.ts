import { expect } from "@playwright/test";
import { test } from "../../fixtures/fixtures";

const id = "ASD-123";

test.beforeEach(async ({ folder, page, signature }) => {
  await page.goto("/system/J100001");
  await folder.create();
  await signature.openSignatureModal();
});

test("Create an unknown signature", async ({ signature }) => {
  await signature.fillSignatureForm({ id });
  await signature.getSaveButton().click();

  await expect(signature.getSignatureList()).toContainText(id);
  await expect(signature.getSignatureList()).toContainText("unknown");
});

test("Create a data signature", async ({ signature }) => {
  await signature.fillSignatureForm({ id, type: "Data" });
  await signature.getSaveButton().click();

  await expect(signature.getSignatureList()).toContainText(id);
  await expect(signature.getSignatureList()).toContainText("data");
});

test("Create a relic signature", async ({ signature }) => {
  await signature.fillSignatureForm({ id, type: "Relic" });
  await signature.getSaveButton().click();

  await expect(signature.getSignatureList()).toContainText(id);
  await expect(signature.getSignatureList()).toContainText("relic");
});

test("Create a gas signature", async ({ signature }) => {
  await signature.fillSignatureForm({ id, type: "Gas" });
  await signature.getSaveButton().click();

  await expect(signature.getSignatureList()).toContainText(id);
  await expect(signature.getSignatureList()).toContainText("gas");
});

test("Alert is shown after adding a signature", async ({
  signature,
  alert,
}) => {
  await signature.fillSignatureForm({ id });
  await signature.getSaveButton().click();

  await expect(alert.getAlert()).toContainText("Signature added");
});

test("Create a signature with a name", async ({ signature }) => {
  const name = "Maximum jeejee";
  await signature.fillSignatureForm({ id, name });
  await signature.getSaveButton().click();

  await expect(signature.getSignatureList()).toContainText(name);
});

test("Alerts about duplicate ID", async ({ signature, page }) => {
  await signature.fillSignatureForm({ id });
  await signature.getSaveButton().click();
  await signature.openSignatureModal();
  await signature.fillSignatureForm({ id });

  await expect(
    page.getByRole("button", { name: "Remove duplicate" }),
  ).toBeVisible();
});
