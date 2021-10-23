import {
  openWormholeForm,
  setWormholeFormValues,
  submitWormholeForm,
  testWormholeProperties,
} from "../support/helpers/wormholeForm.utils";

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

    testWormholeProperties({ ...wh, reverseType: "K162" }, testSystemUrl);
  });

  it("Can edit existing wormhole", () => {
    const wh = {
      name: "Ikuchiii",
      type: "B274",
      eveId: "LOL-654",
      mass: "DESTAB",
    } as const;

    cy.cs("edit-sig-Ikuchi").click();
    setWormholeFormValues(wh);
    submitWormholeForm();
    cy.contains("Wormhole updated.");

    testWormholeProperties(wh, testSystemUrl);
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
    testWormholeProperties(wh, testSystemUrl);
    testWormholeProperties(
      { name: "rev from Jita", destinationName: "Jita", type: "K162" },
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

    cy.visit(testSystemUrl);
    cy.cs("edit-sig-Connection Test 2").click();
    setWormholeFormValues(update);
    submitWormholeForm();

    testWormholeProperties({ ...wh, ...update, reverseType: "K162" }, testSystemUrl);

    cy.visit("/system/Dodixie");
    cy.get("#scanning-content").should("not.contain.text", "rev from Jita");

    testWormholeProperties(
      {
        name: "rev from Jita",
        destinationName: "Jita",
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

    cy.visit(testSystemUrl);
    cy.cs("edit-sig-Connection Test 3").click();
    cy.cs("autocomplete-destinationName").clear();
    submitWormholeForm();

    testWormholeProperties({ ...wh, destinationName: "" }, testSystemUrl);

    cy.visit("/system/Perimeter");
    cy.get("#scanning-content").should("not.contain.text", "rev from Jita");
  });
});
