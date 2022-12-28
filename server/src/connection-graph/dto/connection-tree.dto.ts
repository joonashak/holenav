import systems from "@eve-data/systems";
import { IsIn } from "class-validator";
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

export class ConnectionTreeParams {
  @IsIn(systems.map((s) => s.name), { message: "rootSystemName must be a valid EVE system name" })
  rootSystemName: string;
}
