import { Page } from "@playwright/test";

export class Folder {
  constructor(public readonly page: Page) {}

  async create(name?: string) {
    const hash = crypto.randomUUID().slice(9, 13);
    const folderName = name || `E2E Folder ${hash}`;

    await this.page.goto("/system/J100001");
    await this.page.getByLabel("Open Settings Menu").click();
    await this.page.getByRole("menuitem", { name: "Folder Options" }).click();
    await this.page.getByRole("button", { name: "New Folder" }).click();
    await this.page.getByLabel("Name").fill(folderName);
    await this.page.getByRole("button", { name: "Create" }).click();
    await this.page.getByLabel("Active Folder").click();
    await this.page
      .getByRole("option", { name: folderName, exact: true })
      .click();
  }
}
