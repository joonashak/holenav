import SigType from "../entities/signature/enums/sig-type.enum";

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
