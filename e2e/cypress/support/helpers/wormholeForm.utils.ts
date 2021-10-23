export const openWormholeForm = (): void => {
  cy.cs("add-sig-button").click();
  cy.cs("select-Signature Type").click();
  cy.get("[data-value=WORMHOLE]").click();
};

type TestableWormholeProps = {
  name: string;
  destinationName?: string;
  type?: string;
  eveId?: string;
};

export const testWormholeProperties = (props: TestableWormholeProps, url: string): void => {
  const { name } = props;
  cy.visit(url);
  cy.get("#scanning-content").contains(name);
  cy.cs(`edit-sig-${name}`).click();

  cy.cs("textfield-name").should("have.value", name);

  // Test optional properties.
  Object.keys(props).forEach((key) => {
    if (key === "destinationName") {
      cy.get("[data-cy=autocomplete-destinationName-input] > div > input").should(
        "have.value",
        props[key]
      );
    }

    if (key === "type") {
      cy.get("[data-cy=select-whType] > div > input").should("have.value", props[key]);
    }

    if (key === "eveId") {
      cy.get("[data-cy=textfield-eveId] > div > input").should("have.value", props[key]);
    }

    // TODO: Add farside wh type check.
  });
};
