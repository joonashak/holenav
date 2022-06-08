import { addNewFolder } from "../../support/helpers/folderManagement.utils";
import { ROUTES } from "../../support/routes";

describe("Folder Management", () => {
  describe("Add new folder", () => {
    beforeEach(() => {
      cy.resetDatabase();
      cy.mockManager();
      cy.visit(ROUTES.FOLDER_MANAGEMENT);
    });

    const newFolderName = "New e2e Folder";

    it("Can add new folder", () => {
      addNewFolder(newFolderName);

      cy.visit(ROUTES.ACTIVE_FOLDER);
      cy.cs("select-Active Folder").click();
      cy.contains(newFolderName);
    });

    it("Other users do not see a folder without permissions", () => {
      addNewFolder(newFolderName);

      cy.mockNormalUser();
      cy.visit(ROUTES.ACTIVE_FOLDER);
      cy.cs("select-Active Folder").click();
      cy.contains(newFolderName).should("not.exist");
    });
  });
});
