import { opendir, readFile } from "fs/promises";
import { resolve } from "path";
import { parse as parseYaml } from "yaml";
import { SdeName, SdeSystem } from "../types/SdeTypes";
import formatSystems from "./formatSystems";

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
    ({ itemID }: SdeName) => itemID >= min && itemID <= max
  );

  return items.reduce(
    (names: any, { itemID, itemName }: SdeName) =>
      Object.assign(names, { [itemID]: itemName }),
    {}
  );
};

const getSystemNames = async (systems: SdeSystem[]) => {
  const ids = systems.map(({ solarSystemID }) => solarSystemID);
  const names = await namesById(Math.min(...ids), Math.max(...ids));
  return names;
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
export default async () => {
  const kSpaceSystems = await traverseUniverse("sde/fsd/universe/eve");
  const wSpaceSystems = await traverseUniverse("sde/fsd/universe/wormhole");
  const systemsRaw = kSpaceSystems.concat(wSpaceSystems);
  const names = await getSystemNames(systemsRaw);
  const systems = formatSystems(systemsRaw, names);
  return systems;
};
