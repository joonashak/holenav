export const addNewFolder = (name: string) => {
  cy.cs("textfield-name").type(name);
  cy.cs("add-new-folder-button").click();
  cy.contains("Folder created.");
};
