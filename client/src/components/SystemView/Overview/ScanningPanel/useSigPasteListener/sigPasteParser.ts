import { SigTypes } from "../../../../../generated/graphqlOperations";

export type PastedSig = {
  eveId: string;
  type: SigTypes | null;
  name: string;
};

export type SigPasteEvent = {
  pastedSigs: PastedSig[];
  pastedWormholes: PastedSig[];
};

const findSigType = (typeString: string) => {
  const asd = {
    "Data Site": SigTypes.Data,
    "Relic Site": SigTypes.Relic,
    "Gas Site": SigTypes.Gas,
  };

  if (Object.keys(asd).includes(typeString)) {
    return asd[typeString as keyof typeof asd];
  }

  if (typeString.match(/Wormhole/)) {
    return SigTypes.Wormhole;
  }

  return null;
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
  const pastedSigs = formattedData.filter((sig) => sig.type !== SigTypes.Wormhole);
  const pastedWormholes = formattedData.filter((sig) => sig.type === SigTypes.Wormhole);
  return { pastedSigs, pastedWormholes };
};

export default parsePaste;
