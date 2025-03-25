import { createMock } from "@golevelup/ts-jest";
import { getModelToken } from "@nestjs/mongoose";
import { Test } from "@nestjs/testing";
import { Model } from "mongoose";
import { ConnectionService } from "../connection/connection.service";
import MassStatus from "../connection/mass-status.enum";
import { Folder } from "../folder/folder.model";
import { CreateSignature } from "./dto/create-signature.dto";
import SigType from "./enums/sig-type.enum";
import { Signature, SignatureDocument } from "./signature.model";
import { SignatureService } from "./signature.service";

const testRelic: CreateSignature = {
  eveId: "TRE-100",
  name: "Test Relic 1",
  systemName: "J121558",
  type: SigType.RELIC,
  connection: null,
};

const testSignature: CreateSignature = {
  eveId: "TST-100",
  name: "Test WH 1",
  systemName: "J121558",
  type: SigType.WORMHOLE,
  connection: {
    from: "J121558",
    to: "Amarr",
    eol: false,
    k162: false,
    massStatus: MassStatus.STABLE,
    type: "C140",
  },
};

const testFolder: Folder = {
  id: "test-folder-1",
  name: "Test Folder 1",
};

describe("SignatureService", () => {
  let signatureService: SignatureService;
  let signatureModel: Model<SignatureDocument>;
  let connectionService: ConnectionService;

  const modelToken = getModelToken(Signature.name);

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        SignatureService,
        { provide: modelToken, useFactory: createMock },
      ],
    })
      .useMocker(createMock)
      .compile();

    signatureService = moduleRef.get(SignatureService);
    signatureModel = moduleRef.get(modelToken);
    connectionService = moduleRef.get(ConnectionService);
  });

  it("Signature is created", async () => {
    await signatureService.createSignature(testRelic, testFolder);
    expect(signatureModel.create).toHaveBeenCalledTimes(1);
    expect(signatureModel.create).toHaveBeenCalledWith({
      ...testRelic,
      folder: testFolder,
      createdBy: "",
    });
    expect(connectionService.create).not.toHaveBeenCalled();
  });

  it("Connection is created for wormhole", async () => {
    await signatureService.createSignature(testSignature, testFolder);
    expect(connectionService.create).toHaveBeenCalledTimes(1);
    expect(connectionService.create).toHaveBeenCalledWith(
      testSignature.connection,
      testFolder.id,
      undefined,
    );
  });
});
