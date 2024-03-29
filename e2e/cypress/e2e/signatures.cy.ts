import {
  openSignatureForm,
  setSignatureFormValues,
  submitSignatureForm,
  testSignatureProperties,
} from "../support/helpers/signatureForm.utils";

const testSystemUrl = "/system/Jita";

describe("Signatures", () => {
  beforeEach(() => {
    cy.resetDatabase();
    cy.mockNormalUser();
    cy.visit(testSystemUrl);
  });

  it("Can add new signature", () => {
    const sig = {
      type: "RELIC",
      name: "Test Sig 1",
      eveId: "JEE-999",
    };

    openSignatureForm();
    setSignatureFormValues(sig);
    submitSignatureForm();

    testSignatureProperties(sig);
  });

  it("Can edit a signature", () => {
    const sig = {
      type: "RELIC",
      name: "Test Sig 2",
      eveId: "YES-826",
    };

    const update = {
      type: "DATA",
      name: "Test Sig 2 edited",
      eveId: "YES-123",
    };

    openSignatureForm();
    setSignatureFormValues(sig);
    submitSignatureForm();

    cy.visitAndWaitForXhr(testSystemUrl);
    cy.cs("edit-sig-Test Sig 2").click();
    setSignatureFormValues(update);
    submitSignatureForm();

    testSignatureProperties(update);
  });

  it("Can delete a signature", () => {
    const sig = {
      type: "DATA",
      name: "Test Sig 3",
      eveId: "ASD-111",
    };

    openSignatureForm();
    setSignatureFormValues(sig);
    submitSignatureForm();

    cy.visitAndWaitForXhr(testSystemUrl);
    cy.cs("sig-list-body").should("contain.text", sig.name);
    cy.cs("delete-sig-Test Sig 3").click();
    cy.cs("confirm-button").click();
    cy.visitAndWaitForXhr(testSystemUrl);
    cy.cs("sig-list-body").should("not.contain.text", sig.name);
  });
});
