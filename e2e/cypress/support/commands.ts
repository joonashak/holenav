const apiUrl = Cypress.env("API_URL") || "";

Cypress.Commands.add("resetDatabase", () => {
  indexedDB.deleteDatabase("localforage");
  cy.request({
    method: "GET",
    url: `${apiUrl}/dev/seed`,
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

Cypress.Commands.add("mockNormalUser", () => {
  cy.mockUser(2);
});

Cypress.Commands.add("mockManager", () => {
  cy.mockUser(3);
});

Cypress.Commands.add("mockAdmin", () => {
  cy.mockUser(4);
});

Cypress.Commands.add("getDropdownOptions", () => {
  return cy.get('.MuiAutocomplete-popper [role="listbox"] [role="option"]', {
    timeout: 10000,
  });
});

Cypress.Commands.add("visitAndWaitForXhr", (url: string) => {
  cy.visit(url);

  cy.intercept({
    method: "GET",
    url: `${apiUrl}/**`,
  }).as("xhrGet");

  cy.intercept({
    method: "POST",
    url: `${apiUrl}/**`,
  }).as("xhrPost");

  cy.wait("@xhrGet");
  cy.wait("@xhrPost");
});
