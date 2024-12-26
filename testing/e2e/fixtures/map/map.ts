import { Page } from "@playwright/test";

export class Map {
  constructor(public readonly page: Page) {}

  /**
   * Create map and select it as active (closing map menu).
   *
   * If `name` is not given, a partly random name is generated. Returns the
   * actual name of the created map.
   *
   * If `system` is not given, J100001 is used as root.
   */
  async create({ name, system }: { name?: string; system?: string } = {}) {
    const hash = crypto.randomUUID().slice(9, 13);
    const mapName = name || `E2E Map ${hash}`;
    await this.getMapControlButton().click();
    await this.page.getByRole("menuitem", { name: "New Map" }).click();
    await this.getNameField().fill(mapName);
    await this.selectRootSystem(system || "J100001");
    await this.getSaveButton().click();
    await this.page.getByRole("menuitem", { name: mapName }).click();

    return mapName;
  }

  getMapControlButton() {
    return this.page.getByRole("button", { name: "Select active map" });
  }

  getMapList() {
    return this.page.getByLabel("Map list");
  }

  getEditButton(name: string) {
    return this.page.getByLabel(`Edit map "${name}"`);
  }

  getDeleteButton(name: string) {
    return this.page.getByLabel(`Delete map "${name}"`);
  }

  getConfirmDeleteButton() {
    return this.page.getByLabel("Confirm delete");
  }

  getNameField() {
    return this.page.getByLabel("Name");
  }

  getRootSystemSelect() {
    return this.page.getByLabel("Root System");
  }

  async selectRootSystem(name: string) {
    await this.getRootSystemSelect().fill(name);
    await this.page.getByRole("option", { name, exact: true }).click();
  }

  getSaveButton() {
    return this.page.getByRole("button", { name: "Save" });
  }
}
