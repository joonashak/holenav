import dotenv from "dotenv";
import { writeFile } from "fs/promises";
import { downloadSde } from "./sde";
import getSystemData from "./systemData";
import getWormholeEffects from "./wormholeEffects";

dotenv.config();

const main = async () => {
  const hrstart = process.hrtime();
  // FIXME: Does not await correctly.
  //await downloadSde();

  const effects = await getWormholeEffects();
  const effectsStr = JSON.stringify(effects, null, 4);
  await writeFile("staticData/wormholeEffects.json", effectsStr);

  const systemData = await getSystemData();
  const systemDataStr = JSON.stringify(systemData, null, 4);
  await writeFile("staticData/systems.json", systemDataStr);

  console.log(`\nTOOK ${process.hrtime(hrstart)[0]} s`);
};

main();
