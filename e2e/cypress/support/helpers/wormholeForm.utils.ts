export const openWormholeForm = (): void => {
  cy.cs("add-sig-button").click();
  cy.cs("select-Signature Type").click();
  cy.get("[data-value=WORMHOLE]").click();
};

export const submitWormholeForm = (): void => {
  cy.cs("wh-form-submit").click();
};

type TestableWormholeProps = {
  name: string;
  destinationName?: string;
  type?: string;
  eveId?: string;
};

const wormholePropertyTests = {
  name: (name: string) => cy.cs("textfield-name").should("have.value", name),
  destinationName: (name: string) =>
    cy.get("[data-cy=autocomplete-destinationName-input] > div > input").should("have.value", name),
  type: (type: string) =>
    cy.get("[data-cy=select-whType] > div > input").should("have.value", type),
  eveId: (eveId: string) =>
    cy.get("[data-cy=textfield-eveId] > div > input").should("have.value", eveId),
};

export const testWormholeProperties = (props: TestableWormholeProps, url: string): void => {
  const { name } = props;
  cy.visit(url);
  cy.get("#scanning-content").contains(name);
  cy.cs(`edit-sig-${name}`).click();

  Object.keys(props).forEach((key) => wormholePropertyTests[key](props[key]));
  // TODO: Add farside wh type check.
};

const setFormValue = {
  name: (name: string) => cy.cs("textfield-name").clear().type(name),
  destinationName: (name: string) =>
    cy.cs("autocomplete-destinationName").type(name).type("{downarrow}{enter}"),
  type: (type: string) => {
    cy.cs("select-whType").click();
    cy.get(`[data-value=${type}]`).click();
  },
  eveId: (eveId: string) => cy.cs("textfield-eveId").clear().type(eveId),
};

export const setWormholeFormValues = (props: Partial<TestableWormholeProps>): void =>
  Object.keys(props).forEach((key) => setFormValue[key](props[key]));
