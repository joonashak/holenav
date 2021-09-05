describe("Login", () => {
  before(() => {
    cy.resetDatabase();
  });

  it("Login page loads", () => {
    cy.visit("/");
    cy.contains("Holenav");
  });

  it("User mocking works", () => {
    cy.mockUser(1);
    cy.contains("fail on purpose :)");
  });
});
