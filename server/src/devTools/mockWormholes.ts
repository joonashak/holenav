import { Model } from "mongoose";
import { Wormhole } from "../entities/wormhole/wormhole.model";
import whMockData from "./data/wormholes";

export default async (whModel: Model<Wormhole>) => {
  await whModel.deleteMany({});

  for (const wh of whMockData) {
    await whModel.create(wh);
  }
};
