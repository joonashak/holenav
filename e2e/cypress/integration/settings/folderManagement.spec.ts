describe("Folder Management", () => {
  describe("Add new folder", () => {
    beforeEach(() => {
      cy.resetDatabase();
      cy.mockUser(3);
      cy.visit("/settings/folder/management");
    });

    it("Can add new folder", () => {
      const newFolderName = "New e2e Folder";
      cy.cs("textfield-name").type(newFolderName);
      cy.cs("add-new-folder-button").click();
      cy.contains("Folder created.");

      cy.visit("/settings/folder/active");
      cy.cs("select-Active Folder").click();
      cy.contains(newFolderName);
    });

    it("Other users do not see a folder without permissions", () => {
      const newFolderName = "New e2e Folder";
      cy.cs("textfield-name").type(newFolderName);
      cy.cs("add-new-folder-button").click();
      cy.contains("Folder created.");

      cy.mockUser(2);
      cy.visit("/settings/folder/active");
      cy.cs("select-Active Folder").click();
      cy.contains(newFolderName).should("not.exist");
    });
  });
});
