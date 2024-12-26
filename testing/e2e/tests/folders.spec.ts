import { expect } from "@playwright/test";
import { test } from "../fixtures/fixtures";

test("Signatures are segregated by folder", async ({
  folder,
  signature,
  page,
}) => {
  await page.goto("/system/J100001");
  const folder1 = await folder.create();
  const folder2 = await folder.create();

  const id1 = "FLD-111";
  await folder.changeActiveFolder(folder1);
  await signature.openSignatureModal();
  await signature.fillSignatureForm({ id: id1 });
  await signature.getSaveButton().click();

  const id2 = "FLD-222";
  await folder.changeActiveFolder(folder2);
  await signature.openSignatureModal();
  await signature.fillSignatureForm({ id: id2 });
  await signature.getSaveButton().click();

  await folder.changeActiveFolder(folder1);
  await expect(signature.getSignatureList()).toContainText(id1);
  await expect(signature.getSignatureList()).not.toContainText(id2);

  await folder.changeActiveFolder(folder2);
  await expect(signature.getSignatureList()).toContainText(id2);
  await expect(signature.getSignatureList()).not.toContainText(id1);
});
