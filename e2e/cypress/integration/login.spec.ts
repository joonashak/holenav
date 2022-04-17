describe("Login", () => {
  before(() => {
    cy.resetDatabase();
  });

  it("Login page loads", () => {
    cy.visit("/")
    cy.contains("Holenav");
  });

  it("User mocking works", () => {
    // FIXME: Does not really test anything...
    cy.mockUser(1);
  });
});
