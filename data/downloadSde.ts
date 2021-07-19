import axios from "axios";
import { createWriteStream } from "fs";

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

  res.data.pipe(createWriteStream("sde.zip"));
  res.data.on("end", () => console.log("doned"));
};
