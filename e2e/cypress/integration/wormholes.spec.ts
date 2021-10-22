const testSystemUrl = "/system/Jita";
const testWormhole = {
  name: "Test WH",
  type: "C140",
};

const testWormholeProperties = (props: any) => {
  const { name } = props;
  cy.visit(testSystemUrl);
  cy.contains(name);
  cy.cs(`edit-sig-${name}`).click();

  cy.cs("textfield-name").should("have.value", name);
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
    const { name, type } = testWormhole;
    cy.cs("add-sig-button").click();
    cy.cs("select-Signature Type").click();
    cy.get("[data-value=WORMHOLE]").click();
    cy.cs("textfield-name").type(name);
    cy.cs("select-whType").click();
    cy.get(`[data-value=${type}]`).click(); // TODO: Saving wh type not implemented in app.
    cy.cs("wh-form-submit").click();
    cy.contains("Wormhole added.");

    testWormholeProperties({ name });
  });
});
