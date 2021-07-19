import { writeFile } from "fs/promises";
import { downloadSde, getSystemData } from "./sde";

const main = async () => {
  const hrstart = process.hrtime();
  await downloadSde();
  const systemData = await getSystemData();
  const content = JSON.stringify(systemData);
  await writeFile("static-data/systems.json", content);
  console.log(`\nTOOK ${process.hrtime(hrstart)} sec`);
};

main();
