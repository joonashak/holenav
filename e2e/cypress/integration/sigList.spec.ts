describe("Signature List", () => {
  before(() => {
    cy.resetDatabase();
  });

  it("Can add new wormhole", () => {
    cy.mockUser(2);
    cy.visit("/system/Jita");
    cy.cs("add-sig-button").click();
    cy.cs("select-Signature Type").click();
    cy.get("[data-value=WORMHOLE]").click();
    cy.cs("textfield-name").type("Test WH");
    cy.cs("wh-form-submit").click();
    cy.contains("Wormhole added.");
  });
});
