import {
  openSignatureForm,
  setSignatureFormValues,
  submitSignatureForm,
} from "../support/helpers/signatureForm.utils";
import {
  openWormholeForm,
  setWormholeFormValues,
  submitWormholeForm,
  testWormholeProperties,
} from "../support/helpers/wormholeForm.utils";

const testSystem = "J104809";
const testSystemUrl = `/system/${testSystem}`;

describe("Wormholes", () => {
  beforeEach(() => {
    cy.resetDatabase();
    cy.mockNormalUser();
    cy.visitAndWaitForXhr(testSystemUrl);
  });

  it("Can add new wormhole", () => {
    const wh = {
      name: "Test WH",
      type: "C140",
      destinationName: "Hek",
      eveId: "ASD-123",
      eol: "eol",
      mass: "STABLE",
    } as const;

    openWormholeForm();
    setWormholeFormValues(wh);
    submitWormholeForm();
    cy.contains("Wormhole added.");

    testWormholeProperties({ ...wh, reverseType: "K162" });
  });

  it("Can edit existing wormhole", () => {
    const wh = {
      name: "Ikuchiii",
      type: "B274",
      eveId: "LOL-654",
      mass: "DESTAB",
    } as const;

    cy.cs("edit-sig-FLA DEF").click();
    setWormholeFormValues(wh);
    submitWormholeForm();
    cy.contains("Wormhole updated.");

    testWormholeProperties(wh);
  });

  it("Can delete a wormhole", () => {
    const wh = {
      name: "Deleting Test 1",
      destinationName: "Juunigaishi",
      type: "K162",
      eveId: "JKA-293",
    };

    openWormholeForm();
    setWormholeFormValues(wh);
    submitWormholeForm();
    testWormholeProperties(wh);

    cy.visitAndWaitForXhr(testSystemUrl);
    cy.cs("sig-list-body").should("contain.text", wh.name);
    cy.cs("delete-sig-Deleting Test 1").click();
    cy.cs("confirm-button").click();
    cy.contains("Signature deleted.");
    cy.visitAndWaitForXhr(testSystemUrl);
    cy.cs("sig-list-body").should("not.contain.text", wh.name);
  });

  it("Connection is correctly mapped", () => {
    const wh = {
      name: "Connection Test 1",
      destinationName: "Hakonen",
      type: "H296",
    };

    openWormholeForm();
    setWormholeFormValues(wh);

    submitWormholeForm();
    testWormholeProperties(wh);
    testWormholeProperties(
      { name: "", destinationName: testSystem, type: "K162" },
      "/system/Hakonen"
    );
  });

  it("Connection is correctly updated", () => {
    const wh = {
      name: "Connection Test 2",
      destinationName: "Dodixie",
      type: "K162",
    };

    const update = {
      destinationName: "Amarr",
      eol: "eol",
      mass: "CRIT",
      type: "V753",
    } as const;

    openWormholeForm();
    setWormholeFormValues(wh);
    submitWormholeForm();

    cy.visitAndWaitForXhr(testSystemUrl);
    cy.cs("edit-sig-Connection Test 2").click();
    setWormholeFormValues(update);
    submitWormholeForm();

    testWormholeProperties({ ...wh, ...update, reverseType: "K162" });

    cy.visitAndWaitForXhr("/system/Dodixie");
    cy.get("#scanning-content").should("not.contain.text", "Wormhole");
    cy.get("#scanning-content").should("not.contain.text", "K162");
    cy.get("#scanning-content").should("not.contain.text", "V753");

    testWormholeProperties(
      {
        name: "",
        destinationName: testSystem,
        type: "K162",
        reverseType: "V753",
        eol: "eol",
        mass: "CRIT",
      },
      "/system/Amarr"
    );
  });

  it("Connection is correctly removed", () => {
    const wh = {
      name: "Connection Test 3",
      destinationName: "Perimeter",
    };

    openWormholeForm();
    setWormholeFormValues(wh);
    submitWormholeForm();

    cy.visitAndWaitForXhr(testSystemUrl);
    cy.cs("edit-sig-Connection Test 3").click();
    cy.cs("autocomplete-destinationName").clear();
    submitWormholeForm();

    cy.visitAndWaitForXhr("/system/Perimeter");
    cy.get("#scanning-content").should("not.contain.text", "wormhole");
  });

  it("Can update signature into wormhole", () => {
    const sig = {
      type: "RELIC",
      name: "Type Update Test 1",
      eveId: "JEE-999",
    };

    openSignatureForm();
    setSignatureFormValues(sig);
    submitSignatureForm();

    const update = {
      destinationName: "Mies",
      type: "H296",
    };

    cy.cs("edit-sig-Type Update Test 1").click();
    cy.cs("select-Signature Type").click();
    cy.get("[data-value=WORMHOLE]").click();
    setWormholeFormValues(update);
    submitWormholeForm();

    cy.visitAndWaitForXhr("/system/Mies");
    cy.get("#scanning-content").should("contain.text", "wormhole");
  });

  it("Can update wormhole into signature", () => {
    const wh = {
      name: "Type Update Test 2",
      destinationName: "Tama",
      type: "C140",
    };

    openWormholeForm();
    setWormholeFormValues(wh);
    submitWormholeForm();

    cy.visitAndWaitForXhr("/system/Tama");
    cy.get("#scanning-content").should("contain.text", "wormhole");

    cy.visitAndWaitForXhr(testSystemUrl);
    cy.cs("edit-sig-Type Update Test 2").click();
    cy.cs("select-Signature Type").click();
    cy.get("[data-value=DATA]").click();
    submitSignatureForm();

    cy.visitAndWaitForXhr("/system/Tama");
    cy.get("#scanning-content").should("not.contain.text", "wormhole");
  });
});
