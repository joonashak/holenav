import { openWormholeForm, testWormholeProperties } from "../support/helpers/wormholeForm.utils";

const testSystemUrl = "/system/Jita";

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

    testWormholeProperties({ name, destinationName, type, eveId }, testSystemUrl);
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

    testWormholeProperties({ name, type, eveId }, testSystemUrl);
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
    testWormholeProperties({ name, destinationName }, testSystemUrl);
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

    testWormholeProperties({ name, destinationName: "Amarr" }, testSystemUrl);
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

    testWormholeProperties({ name, destinationName: "" }, testSystemUrl);
    cy.visit("/system/Perimeter");
    cy.get("#scanning-content").should("not.contain.text", "rev from Jita");
  });
});
