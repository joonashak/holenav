const apiUrl = Cypress.env("API_URL") || "";

Cypress.Commands.add("resetDatabase", () => {
  indexedDB.deleteDatabase("localforage");
  cy.request({
    method: "GET",
    url: `${apiUrl}/dev/reset`,
  });
});

Cypress.Commands.add("cs", (name) => cy.get(`[data-cy='${name}']`));

Cypress.Commands.add("mockUser", (id) => {
  indexedDB.deleteDatabase("localforage");
  cy.visit("/");
  cy.cs("devtools-open").click();
  cy.cs("mock-user-select").click();
  cy.cs(`mock-user-option-mock-${id}`).click();
});
