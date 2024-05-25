export const openSignatureForm = (): void => {
  cy.cs("add-sig-button").click();
  cy.contains("[data-cy='sig-modal']", "Add Signature");
};

export const submitSignatureForm = (): void => {
  cy.cs("sig-form-submit").click();
};

type TestableSignatureProps = {
  name: string;
  type?: string;
  eveId?: string;
};

const signaturePropertyTests = {
  name: (name: string) => cy.cs("textfield-name").should("have.value", name),
  type: (type: string) =>
    cy.get("[data-cy='select-Signature Type'] > input").should("have.value", type),
  eveId: (eveId: string) =>
    cy.get("[data-cy=textfield-eveId] > div > input").should("have.value", eveId),
};

export const testSignatureProperties = (
  props: TestableSignatureProps,
  url: string | null = null,
): void => {
  const { name } = props;

  if (url) {
    cy.visit(url);
  }

  cy.get("#scanning-content").contains(name);
  cy.cs(`edit-sig-${name}`).click();

  Object.keys(props).forEach((key) => signaturePropertyTests[key](props[key]));
};

const setFormValue = {
  name: (name: string) => cy.cs("textfield-name").clear().type(name),
  type: (type: string) => {
    cy.cs("select-Signature Type").click();
    cy.get(`[data-value=${type}]`).click();
  },
  eveId: (eveId: string) => cy.cs("textfield-eveId").clear().type(eveId),
};

export const setSignatureFormValues = (props: Partial<TestableSignatureProps>): void =>
  Object.keys(props).forEach((key) => setFormValue[key](props[key]));
