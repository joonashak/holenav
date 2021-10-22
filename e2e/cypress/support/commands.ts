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

Cypress.Commands.add("getDropdownOptions", () => {
  return cy.get('.MuiAutocomplete-popper [role="listbox"] [role="option"]', {
    timeout: 10000,
  });
});
