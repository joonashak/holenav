import axios from "axios";
import { createWriteStream } from "fs";
import { unlink } from "fs/promises";
import { resolve } from "path";
import unzip from "extract-zip";

/**
 * Download SDE (Static Data Export) from EVE's dev website and save locally.
 */
export const downloadSde = async () => {
  console.log("Downloading SDE.");

  const url = process.env.SDE_DOWNLOAD_URL || "";
  const res = await axios(url, {
    responseType: "stream",
  });

  if (res.status !== 200) {
    throw new Error(res.statusText);
  }

  const tempPath = process.env.SDE_TEMP_FILE || "sde.zip";
  await res.data.pipe(createWriteStream(tempPath));
  await new Promise((resolve) => res.data.on("end", resolve));

  console.log("SDE downloaded. Extracting ZIP.");
  const dir = resolve(process.env.SDE_UNZIP_DIR || "./");
  await unzip(tempPath, { dir });
  await unlink(tempPath);
  console.log("SDE fetch complete.");
};
