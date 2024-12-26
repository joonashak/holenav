import { Page } from "@playwright/test";

export class Signature {
  constructor(public readonly page: Page) {}

  /**
   * Open signature modal.
   *
   * If `id` is passed, opens the edit modal. Otherwise, open the modal for
   * adding a signature.
   */
  async openSignatureModal(id?: string) {
    if (id) {
      await this.page.getByLabel(`Edit Signature ${id}`).click();
    } else {
      await this.page.getByRole("button", { name: "Add Signature" }).click();
    }
  }

  async fillSignatureForm({
    id,
    type,
    name,
    destination,
  }: {
    id?: string;
    type?: string;
    name?: string;
    destination?: string;
  }) {
    if (id) {
      await this.getIdField().fill(id);
    }

    if (type) {
      await this.selectType(type);
    }

    if (name) {
      await this.getNameField().fill(name);
    }

    if (destination) {
      await this.selectDestination(destination);
    }
  }

  async deleteSignature(id: string) {
    await this.getDeleteButton(id).click();
    await this.page.getByRole("menuitem", { name: "Confirm" }).click();
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

  getNameField() {
    return this.page.getByLabel("Name");
  }

  getDestinationField() {
    return this.page.getByLabel("Destination");
  }

  async selectDestination(name: string) {
    await this.getDestinationField().fill(name);
    await this.page.getByRole("option", { name, exact: true }).click();
  }

  getSaveButton(type: "signature" | "wormhole" = "signature") {
    return this.page.getByRole("button", {
      name: type === "signature" ? "Save Signature" : "Save Wormhole",
    });
  }

  getSignatureList() {
    return this.page.getByLabel("Signature List");
  }

  getDeleteButton(id: string) {
    return this.page.getByLabel(`Delete Signature ${id}`);
  }
}
