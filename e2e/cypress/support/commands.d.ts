/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Shorthand for using "Cypress Selectors" (CS), i.e., `data-cy` attributes.
     * @param name The desired `data-cy` value to access.
     */
    cs(name: string): Chainable<Element>;

    /**
     * Reset database.
     *
     * Takes a non-trivial amount of time so use only where necessary.
     */
    resetDatabase(): Chainable<Element>;

    /**
     * Mock user using devtools in UI.
     * @param id The number in a mock user's id (after `mock-`).
     */
    mockUser(id: number): Chainable<Element>;

    /**
     * Mock normal user.
     */
    mockNormalUser(): Chainable<Element>;

    /**
     * Mock manager.
     */
    mockManager(): Chainable<Element>;

    /**
     * Mock admin.
     */
    mockAdmin(): Chainable<Element>;

    /**
     * Get MUI Autocomplete options.
     *
     * Works on its own but should be chained after cy.cs() or cy.get() if there are multiple
     * autocompletes in the DOM.
     */
    getDropdownOptions(): Chainable<Element>;
  }
}
