import { getModelToken } from "@nestjs/mongoose";
import { Test } from "@nestjs/testing";
import { Model } from "mongoose";
import { MockWormholeService } from "../../../test-utils/mock-services";
import {
  testUnknownSig,
  testWormhole,
  testWormholeWithReverse,
} from "../../../test-utils/test-data";
import { Signature } from "../signature-OLD.model";
import { SignatureService } from "./signature.service";
import { WormholeService } from "./wormhole.service";

describe("SignatureService", () => {
  let signatureService: SignatureService;
  let wormholeService: WormholeService;
  let sigModel: Model<Signature>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        SignatureService,
        MockWormholeService,
        {
          provide: getModelToken(Signature.name),
          useFactory: () => ({
            create: jest.fn().mockImplementation((sig) => sig),
            findByIdAndUpdate: jest.fn(() => ({
              populate: () => testWormholeWithReverse,
              exec: () => testWormholeWithReverse,
            })),
          }),
        },
      ],
    }).compile();

    signatureService = module.get<SignatureService>(SignatureService);
    wormholeService = module.get<WormholeService>(WormholeService);
    sigModel = module.get<Model<Signature>>(getModelToken(Signature.name));
  });

  it("Create signatures", async () => {
    const sigs = [testUnknownSig, testWormhole];
    await expect(signatureService.createSignatures(sigs)).resolves.toEqual(sigs);
    expect(wormholeService.addReverseWormholes).toBeCalledWith(sigs);
    expect(sigModel.create).toBeCalledTimes(1);
  });
});
