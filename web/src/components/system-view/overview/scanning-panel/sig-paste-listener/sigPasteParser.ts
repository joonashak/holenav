import { SigType } from "../../../../../generated/graphql-operations";

export type PastedSig = {
  eveId: string;
  type: SigType;
  name: string;
};

const findSigType = (typeString: string): SigType => {
  const sigTypeMap = {
    "Data Site": SigType.Data,
    "Relic Site": SigType.Relic,
    "Gas Site": SigType.Gas,
  };

  if (Object.keys(sigTypeMap).includes(typeString)) {
    return sigTypeMap[typeString as keyof typeof sigTypeMap];
  }

  if (typeString.match(/Wormhole/)) {
    return SigType.Wormhole;
  }

  return SigType.Unknown;
};

const getPasteDataMatrix = (paste: string): string[][] => {
  const rows = paste.split(/\r?\n/).filter((row) => row.length);
  return rows.map((row) => row.split(/\t/));
};

const formatPasteRow = (row: string[]): PastedSig => {
  const eveId = row[0];

  if (!eveId.match(/^[A-Z]{3}-\d{3}$/)) {
    throw new Error("Bad paste data detected. No changes were made.");
  }

  const type = findSigType(row[2]);
  const name = type === SigType.Wormhole ? "" : row[3];
  return { eveId, type, name };
};

const parsePaste = (pasteEvent: ClipboardEvent | string): PastedSig[] => {
  const paste =
    typeof pasteEvent === "string"
      ? pasteEvent
      : pasteEvent.clipboardData?.getData("text") || "";
  const pasteMatrix = getPasteDataMatrix(paste);
  return pasteMatrix.map(formatPasteRow);
};

export default parsePaste;
