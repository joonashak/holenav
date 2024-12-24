import { Page } from "@playwright/test";

export class Signature {
  constructor(public readonly page: Page) {}

  async openSignatureModal() {
    // TODO: Add option to open edit modal.
    await this.page.getByRole("button", { name: "Add Signature" }).click();
  }

  async fillSignatureForm({ id, type }: { id: string; type?: string }) {
    await this.getIdField().fill(id);

    if (type) {
      await this.selectType(type);
    }
  }

  getIdField() {
    return this.page.getByLabel("ID");
  }

  getTypeField() {
    return this.page.getByLabel("Signature Type");
  }

  async selectType(type: string) {
    await this.getTypeField().click();
    await this.page.getByRole("option", { name: type }).click();
  }

  getSaveButton() {
    return this.page.getByRole("button", { name: "Save Signature" });
  }

  getSignatureList() {
    return this.page.getByLabel("Signature List");
  }
}
