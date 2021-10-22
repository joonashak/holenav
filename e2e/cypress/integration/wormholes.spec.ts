const testSystemUrl = "/system/Jita";
const testWormhole = {
  name: "Test WH",
  type: "C140",
  destinationName: "Hek",
};

const testWormholeProperties = (props: any) => {
  const { name } = props;
  cy.visit(testSystemUrl);
  cy.contains(name);
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
  });
};

describe("Wormholes", () => {
  before(() => {
    cy.resetDatabase();
    cy.mockUser(2);
  });

  beforeEach(() => {
    cy.visit(testSystemUrl);
  });

  it("Can add new wormhole", () => {
    const { name, type, destinationName } = testWormhole;
    cy.cs("add-sig-button").click();
    cy.cs("select-Signature Type").click();
    cy.get("[data-value=WORMHOLE]").click();

    cy.cs("textfield-name").type(name);
    cy.cs("select-whType").click();
    cy.get(`[data-value=${type}]`).click(); // TODO: Saving wh type not implemented in app.
    /*
    // Works but takes over a minute to select from 8035 options :D
    cy.cs("autocomplete-destinationName").click();
    cy.cs("autocomplete-destinationName").getDropdownOptions().contains("Hek").click({ force: true });
    */
    cy.cs("autocomplete-destinationName").type(destinationName).type("{downarrow}{enter}");

    cy.cs("wh-form-submit").click();
    cy.contains("Wormhole added.");

    testWormholeProperties({ name, destinationName });
  });

  it("Can edit existing wormhole", () => {
    cy.cs("edit-sig-Ikuchi").click();
    cy.cs("textfield-name").clear().type("Ikuchiii");
    cy.cs("wh-form-submit").click();
    cy.contains("Wormhole updated.");

    testWormholeProperties({ name: "Ikuchiii" });
  });
});
