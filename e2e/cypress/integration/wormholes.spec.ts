const testSystemUrl = "/system/Jita";

const testWormholeProperties = (props: any, url = testSystemUrl) => {
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

const openWormholeForm = () => {
  cy.cs("add-sig-button").click();
  cy.cs("select-Signature Type").click();
  cy.get("[data-value=WORMHOLE]").click();
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
    const name = "Test WH";
    const type = "C140";
    const destinationName = "Hek";
    const eveId = "ASD-123";
    openWormholeForm();

    cy.cs("textfield-eveId").type(eveId);
    cy.cs("textfield-name").type(name);
    cy.cs("select-whType").click();
    cy.get(`[data-value=${type}]`).click();
    /*
    // Works but takes over a minute to select from 8035 options :D
    cy.cs("autocomplete-destinationName").click();
    cy.cs("autocomplete-destinationName").getDropdownOptions().contains("Hek").click({ force: true });
    */
    cy.cs("autocomplete-destinationName").type(destinationName).type("{downarrow}{enter}");

    cy.cs("wh-form-submit").click();
    cy.contains("Wormhole added.");

    testWormholeProperties({ name, destinationName, type, eveId });
  });

  it("Can edit existing wormhole", () => {
    const name = "Ikuchiii";
    const type = "B274";
    const eveId = "LOL-654";

    cy.cs("edit-sig-Ikuchi").click();

    cy.cs("textfield-eveId").clear().type(eveId);
    cy.cs("textfield-name").clear().type(name);
    cy.cs("select-whType").click();
    cy.get(`[data-value=${type}]`).click();

    cy.cs("wh-form-submit").click();
    cy.contains("Wormhole updated.");

    testWormholeProperties({ name, type, eveId });
  });

  it("Connection is correctly mapped", () => {
    const name = "Connection Test";
    const destinationName = "Hakonen";
    const type = "H296";
    openWormholeForm();

    cy.cs("textfield-name").type(name);
    cy.cs("select-whType").click();
    cy.get(`[data-value=${type}]`).click();
    cy.cs("autocomplete-destinationName").type(destinationName).type("{downarrow}{enter}");
    cy.cs("wh-form-submit").click();
    testWormholeProperties({ name, destinationName });
    testWormholeProperties(
      { name: "rev from Jita", destinationName: "Jita", type: "K162" },
      "/system/Hakonen"
    );
  });

  it("Connection is correctly updated", () => {
    // TODO: Test for type reset (selecte K162) here after farside wormhole has been fixed.
    const name = "Connection Test 2";
    const destinationName = "Dodixie";
    const type = "K162";
    openWormholeForm();

    cy.cs("textfield-name").type(name);
    cy.cs("select-whType").click();
    cy.get(`[data-value=${type}]`).click();
    cy.cs("autocomplete-destinationName").type(destinationName).type("{downarrow}{enter}");
    cy.cs("wh-form-submit").click();

    cy.visit(testSystemUrl);
    cy.cs("edit-sig-Connection Test 2").click();
    cy.cs("autocomplete-destinationName").clear().type("Amarr").type("{downarrow}{enter}");
    cy.cs("wh-form-submit").click();

    testWormholeProperties({ name, destinationName: "Amarr" });
    cy.visit("/system/Dodixie");
    cy.get("#scanning-content").should("not.contain.text", "rev from Jita");
    testWormholeProperties({ name: "rev from Jita", destinationName: "Jita" }, "/system/Amarr");
  });

  it("Connection is correctly removed", () => {
    const name = "Connection Test 3";
    const destinationName = "Perimeter";
    openWormholeForm();

    cy.cs("textfield-name").type(name);
    cy.cs("autocomplete-destinationName").type(destinationName).type("{downarrow}{enter}");
    cy.cs("wh-form-submit").click();

    cy.visit(testSystemUrl);
    cy.cs("edit-sig-Connection Test 3").click();
    cy.cs("autocomplete-destinationName").clear();
    cy.cs("wh-form-submit").click();

    testWormholeProperties({ name, destinationName: "" });
    cy.visit("/system/Perimeter");
    cy.get("#scanning-content").should("not.contain.text", "rev from Jita");
  });
});
