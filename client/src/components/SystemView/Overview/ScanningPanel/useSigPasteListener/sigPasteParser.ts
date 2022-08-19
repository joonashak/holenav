import { SigType } from "../../../../../generated/graphqlOperations";

export type PastedSig = {
  eveId: string;
  type: SigType;
  name: string;
};

export type SigPasteEvent = {
  pastedSigs: PastedSig[];
  pastedWormholes: PastedSig[];
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

const getPasteDataMatrix = (pasteEvent: ClipboardEvent): string[][] => {
  const input = pasteEvent.clipboardData?.getData("text") || "";
  const rows = input.split(/\r?\n/).filter((row) => row.length);
  return rows.map((row) => row.split(/\t/));
};

const formatPasteRow = (row: string[]): PastedSig => {
  const eveId = row[0];

  if (!eveId.match(/^[A-Z]{3}-\d{3}$/)) {
    throw new Error("Bad paste data detected. No changes were made.");
  }

  const type = findSigType(row[2]);
  const name = row[3];
  return { eveId, type, name };
};

const parsePaste = (pasteEvent: ClipboardEvent): SigPasteEvent => {
  const pasteMatrix = getPasteDataMatrix(pasteEvent);
  const formattedData = pasteMatrix.map(formatPasteRow);
  const pastedSigs = formattedData.filter((sig) => sig.type !== SigType.Wormhole);
  const pastedWormholes = formattedData.filter((sig) => sig.type === SigType.Wormhole);
  return { pastedSigs, pastedWormholes };
};

export default parsePaste;
