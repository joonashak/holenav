import { Page } from "@playwright/test";

export class Signature {
  constructor(public readonly page: Page) {}

  async openSignatureModal() {
    // TODO: Add option to open edit modal.
    await this.page.getByRole("button", { name: "Add Signature" }).click();
  }

  getIdField() {
    return this.page.getByLabel("ID");
  }

  getSaveButton() {
    return this.page.getByRole("button", { name: "Save Signature" });
  }

  getSignatureList() {
    return this.page.getByLabel("Signature List");
  }
}
