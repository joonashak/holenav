import { Model } from "mongoose";
import { SystemService } from "../entities/system/system.service";
import { Wormhole } from "../entities/wormhole/wormhole.model";
import whMockData from "./data/wormholes";

export default async (whModel: Model<Wormhole>, systemService: SystemService) => {
  await whModel.deleteMany({});

  for (const mock of whMockData) {
    const wh = await whFromMock(mock, systemService);
    console.log(wh);
  }
};

const saveWh = async (wh: Wormhole) => {};

const whFromMock = async (mock: any, systemService: SystemService) => {
  const { name, systemName, destinationName } = mock;
  const system = await systemService.getByName(systemName);
  const destination = await systemService.getByName(destinationName);

  return {
    name,
    system,
    destination,
  };
};
