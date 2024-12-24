import { Page } from "@playwright/test";

export class Alert {
  constructor(public readonly page: Page) {}

  getAlert() {
    return this.page.getByRole("alert");
  }
}
