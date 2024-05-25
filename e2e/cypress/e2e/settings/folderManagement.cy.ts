import { addNewFolder } from "../../support/helpers/folderManagement.utils";
import { ROUTES } from "../../support/routes";

const testFolderName = "New e2e Folder";

describe.skip("Folder Management", () => {
  describe("Add new folder", () => {
    beforeEach(() => {
      cy.resetDatabase();
      cy.mockManager();
      cy.visit(ROUTES.FOLDER_MANAGEMENT);
    });

    it("Can add new folder", () => {
      addNewFolder(testFolderName);

      cy.visit(ROUTES.ACTIVE_FOLDER);
      cy.cs("select-Active Folder").click();
      cy.contains(testFolderName);
    });

    it("Other users do not see a folder without permissions", () => {
      addNewFolder(testFolderName);

      cy.mockNormalUser();
      cy.visit(ROUTES.ACTIVE_FOLDER);
      cy.cs("select-Active Folder").click();
      cy.contains(testFolderName).should("not.exist");
    });
  });

  describe("Folder role management", () => {
    beforeEach(() => {
      cy.resetDatabase();
      cy.mockManager();
      cy.visit(ROUTES.FOLDER_MANAGEMENT);
      addNewFolder(testFolderName);
    });

    it("Can add a folder role to a user", () => {
      cy.cs("select-Select Folder").click();
      cy.contains(testFolderName).click();

      cy.cs("character-search-textfield").type("Write");
      cy.contains("Char 2 (write)").click();

      cy.cs("select-Select Role").click();
      cy.contains("Write").click();
      cy.contains("Add Role").click();
      cy.contains("Role added.");

      cy.mockNormalUser();
      cy.visit(ROUTES.ACTIVE_FOLDER);
      cy.cs("select-Active Folder").click();
      cy.contains(testFolderName);
    });
  });
});
