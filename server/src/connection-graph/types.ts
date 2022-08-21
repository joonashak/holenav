import SigType from "../entities/signature/enums/sig-type.enum";

export type GraphSystem = {
  name: string;
  folderId: string;
};

export type GraphSignature = {
  eveId: string;
  type: SigType;
  systemName: string;
  folderId: string;
};

export type GraphConnection = {
  from: string;
  to: string;
};
