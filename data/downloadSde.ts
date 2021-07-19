import axios from "axios";
import { createWriteStream } from "fs";
import { resolve } from "path";
import unzip from "extract-zip";

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
