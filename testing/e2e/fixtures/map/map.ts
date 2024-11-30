import { expect, Page } from "@playwright/test";
import { Account } from "../auth.fixture";

export class Map {
  constructor(
    public readonly page: Page,
    public readonly account: Account,
  ) {}

  async create() {
    const mapName = `E2E Map ${this.account.eveId}`;
    await this.page.goto("/system/J104809");
    await this.page.getByRole("button", { name: "Select active map" }).click();
    await this.page.getByRole("menuitem", { name: "New Map" }).click();
    await this.page.getByLabel("Name").fill(mapName);
    await this.page.getByLabel("Root System").fill("J100001");
    await this.page
      .getByRole("option", { name: "J100001", exact: true })
      .click();
    await this.page.getByRole("button", { name: "Save" }).click();
    await this.page.getByRole("menuitem", { name: mapName }).click();

    await expect(
      this.page.getByRole("button", { name: "Select active map" }),
    ).toContainText(mapName);
  }

  asd() {
    // Dummy method for testing map fixture.
  }
}
