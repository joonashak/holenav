import { User } from "@joonashak/nestjs-clone-bay";
import { Connection } from "../connection/connection.model";

export type ReverseSignatureUpdate = {
  connection: Connection;
  systemName: string;
  user?: User;
};
