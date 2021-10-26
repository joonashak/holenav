import {
  openSignatureForm,
  setSignatureFormValues,
  submitSignatureForm,
  testSignatureProperties,
} from "../support/helpers/signatureForm.utils";

const testSystemUrl = "/system/Jita";

describe("Signatures", () => {
  before(() => {
    cy.resetDatabase();
    cy.mockUser(2);
  });

  beforeEach(() => {
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

    testSignatureProperties(sig, testSystemUrl);
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

    cy.visit(testSystemUrl);
    cy.cs("edit-sig-Test Sig 2").click();
    setSignatureFormValues(update);
    submitSignatureForm();

    testSignatureProperties(update, testSystemUrl);
  });
});
