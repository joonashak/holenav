import { getModelToken } from "@nestjs/mongoose";
import { Test } from "@nestjs/testing";
import { UserInputError } from "apollo-server-express";
import { Model } from "mongoose";
import {
  testUnknownSig,
  testWormhole,
  testWormholeWithReverse,
} from "../../../test-utils/test-data";
import { Signature, SignatureDocument } from "../signature.model";
import { WormholeService } from "./wormhole.service";

const testDoc = testWormhole as SignatureDocument;

describe("WormholeService", () => {
  let wormholeService: WormholeService;
  let sigModel: Model<Signature>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        WormholeService,
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

    wormholeService = module.get<WormholeService>(WormholeService);
    sigModel = module.get<Model<Signature>>(getModelToken(Signature.name));
  });

  describe("Wormhole type inference", () => {
    it("Does not type non-wormhole signatures", () => {
      expect(wormholeService.addWhTypes(testUnknownSig)).toEqual(testUnknownSig);
    });

    it("Passes missing types through", () => {
      expect(wormholeService.addWhTypes(testWormhole)).toEqual({
        ...testWormhole,
        wormholeType: null,
        reverseType: null,
      });
    });

    it("Passes complete types through", () => {
      const wh = { ...testWormhole, wormholeType: "X702", reverseType: "K162" };
      const flipped = { ...wh, wormholeType: wh.reverseType, reverseType: wh.wormholeType };
      expect(wormholeService.addWhTypes(wh)).toEqual(wh);
      expect(wormholeService.addWhTypes(flipped)).toEqual(flipped);
    });

    it("Infers system-side K162 correctly", () => {
      const wh = { ...testWormhole, reverseType: "C140" };
      expect(wormholeService.addWhTypes(wh)).toEqual({ ...wh, wormholeType: "K162" });
    });

    it("Infers reverse-side K162 correctly", () => {
      const wh = { ...testWormhole, wormholeType: "C140" };
      expect(wormholeService.addWhTypes(wh)).toEqual({ ...wh, reverseType: "K162" });
    });

    it("Does not allow same type on both sides", () => {
      const wh = { ...testWormhole, wormholeType: "C140", reverseType: "C140" };
      expect(() => wormholeService.addWhTypes(wh)).toThrow(UserInputError);
    });
  });

  describe("Reverse wormhole operations", () => {
    it("Passes non-wormhole sigs through", async () => {
      await expect(
        wormholeService.addReverseWormhole(testUnknownSig as SignatureDocument),
      ).resolves.toEqual(testUnknownSig);
    });

    it("Adds reverse wormhole", async () => {
      await expect(wormholeService.addReverseWormhole(testDoc)).resolves.toEqual(
        testWormholeWithReverse,
      );
      expect(sigModel.create).toBeCalledTimes(1);
      expect(sigModel.create).toBeCalledWith({
        ...testWormholeWithReverse.reverse,
        reverse: testWormhole,
      });
      expect(sigModel.findByIdAndUpdate).toBeCalledTimes(1);
    });

    it("Adds reverse wormholes to a list", async () => {
      await expect(wormholeService.addReverseWormholes([testDoc, testDoc])).resolves.toEqual([
        testWormholeWithReverse,
        testWormholeWithReverse,
      ]);
    });

    it("Syncs existing reverse wormhole", async () => {
      const update = {
        systemName: "",
        destinationName: testWormholeWithReverse.systemName,
        wormholeType: testWormholeWithReverse.reverseType,
        reverseType: testWormholeWithReverse.wormholeType,
        eol: testWormholeWithReverse.reverse.eol,
        massStatus: testWormholeWithReverse.reverse.massStatus,
      };
      await wormholeService.syncReverseWormhole(testWormholeWithReverse as SignatureDocument);
      expect(sigModel.findByIdAndUpdate).toBeCalledWith(testWormholeWithReverse.reverse, update, {
        returnDocument: "after",
      });
    });
  });
});
