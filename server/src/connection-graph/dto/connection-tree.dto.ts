import systems from "@eve-data/systems";
import { IsIn } from "class-validator";
import { SignatureOLD } from "../../entities/signature/signature-OLD.model";

export type ConnectionTree = {
  rootSystemName: string;
  children: ConnectionTreeNode[];
};

export type ConnectionTreeNode = {
  name: string;
  children: ConnectionTreeNode[];
  wormhole: SignatureOLD;
};

export class ConnectionTreeParams {
  @IsIn(systems.map((s) => s.name), { message: "rootSystemName must be a valid EVE system name" })
  rootSystemName: string;
}
