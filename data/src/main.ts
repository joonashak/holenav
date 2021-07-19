import dotenv from "dotenv";
import { writeFile } from "fs/promises";
import { downloadSde } from "./sde";
import getSystemData from "./systemData";

dotenv.config();

const main = async () => {
  const hrstart = process.hrtime();
  await downloadSde();
  const systemData = await getSystemData();
  const content = JSON.stringify(systemData, null, 4);
  await writeFile("static-data/systems.json", content);
  console.log(`\nTOOK ${process.hrtime(hrstart)[0]} s`);
};

main();
