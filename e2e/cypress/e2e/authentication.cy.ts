describe("Authentication", () => {
  describe("Local login", () => {
    beforeEach(() => {
      cy.resetDatabase();
      cy.visit("/");
    });

    it("Can login with valid credentials", () => {
      cy.cs("open-local-login").click();
      cy.cs("textfield-username").clear().type("mock-user-1");
      cy.cs("textfield-password").clear().type("mock-password-1");
      cy.cs("login").click();
      cy.contains("Demo Chain");
    });

    it("Cannot login with invalid username", () => {
      cy.cs("open-local-login").click();
      cy.cs("textfield-username").clear().type("mock-user-11");
      cy.cs("textfield-password").clear().type("mock-password-1");
      cy.cs("login").click();
      cy.contains("Login failed.");
    });

    it("Cannot login with invalid password", () => {
      cy.cs("open-local-login").click();
      cy.cs("textfield-username").clear().type("mock-user-1");
      cy.cs("textfield-password").clear().type("mock-password-11");
      cy.cs("login").click();
      cy.contains("Login failed.");
    });
  });

  describe("Logout", () => {
    before(() => {
      cy.resetDatabase();
      cy.visit("/");
    });

    it("Can logout", () => {
      cy.cs("open-local-login").click();
      cy.cs("textfield-username").clear().type("mock-user-1");
      cy.cs("textfield-password").clear().type("mock-password-1");
      cy.cs("login").click();
      cy.cs("open-main-menu").click();
      cy.cs("logout-button").click();
      cy.contains("Login with Holenav");
    });
  });
});
