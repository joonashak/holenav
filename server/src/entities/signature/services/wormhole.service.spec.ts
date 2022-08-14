import { getModelToken } from "@nestjs/mongoose";
import { Test } from "@nestjs/testing";
import { UserInputError } from "apollo-server-express";
import { testUnknownSig, testWormhole } from "../../../test-utils/test-data";
import { Signature } from "../signature.model";
import { WormholeService } from "./wormhole.service";

describe("WormholeService", () => {
  let wormholeService: WormholeService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        WormholeService,
        {
          provide: getModelToken(Signature.name),
          useFactory: () => ({}),
        },
      ],
    }).compile();

    wormholeService = module.get<WormholeService>(WormholeService);
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
});
