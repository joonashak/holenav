import { Signature } from "../../entities/signature/signature.model";

export type ConnectionTree = {
  rootSystemName: string;
  children: ConnectionTreeNode[];
};

export type ConnectionTreeNode = {
  name: string;
  children: ConnectionTreeNode[];
  wormhole: Signature;
};
