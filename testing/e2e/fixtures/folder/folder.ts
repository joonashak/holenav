import { Page } from "@playwright/test";

export class Folder {
  constructor(public readonly page: Page) {}

  /**
   * Create folder and select it as active.
   *
   * If `name` is not given, a short hash is used to randomize folders between
   * workers (recommended). Returns the actual name of the created folder.
   */
  async create(name?: string): Promise<string> {
    const hash = crypto.randomUUID().slice(9, 13);
    const folderName = name || `E2E Folder ${hash}`;

    await this.openFolderSettings();
    await this.page.getByRole("button", { name: "New Folder" }).click();
    await this.page.getByLabel("Name").fill(folderName);
    await this.page.getByRole("button", { name: "Create" }).click();
    await this.selectActiveFolder(folderName);
    await this.page.keyboard.press("Escape");

    return folderName;
  }

  async openFolderSettings() {
    await this.page.getByLabel("Open Settings Menu").click();
    await this.page.getByRole("menuitem", { name: "Folder Options" }).click();
  }

  async selectActiveFolder(name: string) {
    await this.page.getByLabel("Active Folder").click();
    await this.page.getByRole("option", { name, exact: true }).click();
  }
}
