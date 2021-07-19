import axios from "axios";
import { createWriteStream } from "fs";
import { opendir, readFile } from "fs/promises";
import { resolve } from "path";
import unzip from "extract-zip";
import { parse as parseYaml } from "yaml";

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
  //const wSpaceSystems = await traverseUniverse("sde/fsd/universe/wormhole");
  //const systems = kSpaceSystems.join(wSpaceSystems);
  console.log(kSpaceSystems.length);
};
