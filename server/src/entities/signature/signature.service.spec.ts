import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { NotFoundException } from "@nestjs/common";
import { getModelToken } from "@nestjs/mongoose";
import { Test } from "@nestjs/testing";
import { Model } from "mongoose";
import { ConnectionDocument } from "../connection/connection.model";
import { ConnectionService } from "../connection/connection.service";
import { UpdateConnection } from "../connection/dto/update-connection.dto";
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
  let signatureModel: DeepMocked<Model<SignatureDocument>>;
  let connectionService: DeepMocked<ConnectionService>;

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

  it("Connections are deleted if signature creation fails", async () => {
    const createdConnectionId = "aoeirgh9385";

    connectionService.create.mockResolvedValueOnce({
      id: createdConnectionId,
    } as ConnectionDocument);

    signatureModel.create.mockRejectedValueOnce(new Error());

    const test = async () =>
      signatureService.createSignature(testSignature, testFolder);

    await expect(test).rejects.toThrow();
    expect(connectionService.delete).toHaveBeenCalledTimes(1);
    expect(connectionService.delete).toHaveBeenCalledWith(createdConnectionId);
  });

  it("Does not attempt to update a missing signature", async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    signatureModel.findOne().populate.mockResolvedValueOnce(undefined as any);

    const test = async () =>
      signatureService.update({ id: "anything" }, testFolder);

    await expect(test).rejects.toThrow(NotFoundException);
  });

  it("Creates new connection when update adds one", async () => {
    signatureModel.findOne().populate.mockResolvedValueOnce(testRelic);
    await signatureService.update(
      {
        id: "anything",
        connection: testSignature.connection as UpdateConnection,
      },
      testFolder,
    );
    expect(connectionService.create).toHaveBeenCalledTimes(1);
  });

  it("Updates existing connection", async () => {
    signatureModel.findOne().populate.mockResolvedValueOnce(testSignature);
    await signatureService.update(
      {
        id: "anything",
        connection: testSignature.connection as UpdateConnection,
      },
      testFolder,
    );
    expect(connectionService.update).toHaveBeenCalledTimes(1);
  });

  it("Deletes existing connection when update does not include one", async () => {
    signatureModel.findOne().populate.mockResolvedValueOnce(testSignature);
    await signatureService.update(
      {
        id: "anything",
        connection: null,
      },
      testFolder,
    );
    expect(connectionService.delete).toHaveBeenCalledTimes(1);
  });
});
