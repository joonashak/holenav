import { writeFileSync } from "fs";
import { fetchAllSystemData } from "./esi-fetchers";
import { formatSystem } from "./formatters";

const main = async () => {
  const systemData = await fetchAllSystemData();
  const formattedSystemData = systemData.map(formatSystem);
  writeFileSync(
    "static-data/systems.json",
    JSON.stringify(formattedSystemData)
  );
};

main();
