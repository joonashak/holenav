import { readFile } from "fs/promises";
import { parse as parseYaml } from "yaml";

export default async () => {
  const effectsYaml = await readFile("assets/wormholeEffects.yaml", {
    encoding: "utf8",
  });

  const effectsRaw: any = parseYaml(effectsYaml);

  const effects = Object.entries(effectsRaw).reduce(
    (acc: any, [key, val]: any) => {
      acc[key] = val.name.en;
      return acc;
    },
    {}
  );

  return effects;
};
