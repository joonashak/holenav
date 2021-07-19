import axios from "axios";
import { createWriteStream } from "fs";
import { opendir, readFile } from "fs/promises";
import { resolve } from "path";
import unzip from "extract-zip";
import { parse as parseYaml } from "yaml";
import { formatSystem } from "./formatters";

type EsiSystem = {
  solarSystemID: number;
  security: number;
};

type EsiName = {
  itemID: number;
  itemName: string;
};

/**
 * Download SDE (Static Data Export) from EVE's dev website and save locally.
 */
export const downloadSde = async () => {
  const res = await axios(
    "https://eve-static-data-export.s3-eu-west-1.amazonaws.com/tranquility/sde.zip",
    { responseType: "stream" }
  );

  if (res.status !== 200) {
    throw new Error(res.statusText);
  }

  await res.data.pipe(createWriteStream("sde.zip"));
  await res.data.on("end", async () => {
    console.log("SDE downloaded. Extracting ZIP.");
    const target = resolve(__dirname);
    await unzip("./sde.zip", { dir: target });
  });
};

/**
 * Get the contents of the names file as an object where keys are itemID's and values
 * corresponding names. Use min and max to limit the range of ID's returned or wait for
 * this to finish until hell freezes over.
 */
const namesById = async (min: number, max: number) => {
  const itemsYaml = await readFile("sde/bsd/invNames.yaml", {
    encoding: "utf8",
  });
  const items = parseYaml(itemsYaml).filter(
    ({ itemID }: EsiName) => itemID >= min && itemID <= max
  );

  return items.reduce(
    (names: any, { itemID, itemName }: EsiName) =>
      Object.assign(names, { [itemID]: itemName }),
    {}
  );
};

const addNamesToSystems = async (systems: EsiSystem[]) => {
  try {
    const ids = systems.map(({ solarSystemID }) => solarSystemID);
    const names = await namesById(Math.min(...ids), Math.max(...ids));
    return systems.map((system) =>
      Object.assign(system, { name: names[system.solarSystemID] })
    );
  } catch (error) {
    console.log("FAILED");
    console.log(systems);
  }

  return [];
};

/**
 * Traverse the given directory recursively and return a list of planetary system data
 * found therein.
 */
const traverseUniverse = async (
  path: string,
  systems: any[] = []
): Promise<any> => {
  const dir = await opendir(path);

  for await (const dirent of dir) {
    const direntPath = resolve(dir.path, dirent.name);

    if (dirent.isDirectory()) {
      await traverseUniverse(direntPath, systems);
    }

    if (dirent.name === "solarsystem.staticdata") {
      const content = parseYaml(
        await readFile(direntPath, { encoding: "utf8" })
      );
      systems.push(content);
    }
  }

  return systems;
};

/**
 * Get data for all planetary systems in SDE.
 */
export const getSystemData = async () => {
  const kSpaceSystems = await traverseUniverse("sde/fsd/universe/eve");
  const wSpaceSystems = await traverseUniverse("sde/fsd/universe/wormhole");
  const systemsRaw = kSpaceSystems.concat(wSpaceSystems);
  const systems = (await addNamesToSystems(systemsRaw)).map(formatSystem);
  return systems;
};
