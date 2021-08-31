import { Model } from "mongoose";
import { SignatureDocument } from "../../entities/signature/signature.model";
import { SignatureService } from "../../entities/signature/signature.service";
import SigTypes from "../../entities/signature/sigTypes.enum";
import { SystemService } from "../../entities/system/system.service";

type Connection = {
  name: string;
  connections: Connection[];
};

const connectionsFromJita = [
  {
    name: "Ikuchi",
    connections: [{ name: "Ansila", connections: [{ name: "Hykkota", connections: [] }] }],
  },
  { name: "Maurasi", connections: [] },
];

export default async (
  sigModel: Model<SignatureDocument>,
  sigService: SignatureService,
  systemService: SystemService,
) => {
  await sigModel.deleteMany({});
  await saveSigs(connectionsFromJita, "Jita", sigService, systemService);
};

const saveSigs = async (
  connections: Connection[],
  systemName: string,
  sigService: SignatureService,
  systemService: SystemService,
) => {
  for (const conn of connections) {
    const { systemId, ...sig } = await createSig(conn, systemName, systemService);
    await sigService.createSignature(systemId, sig);

    if (conn.connections.length) {
      await saveSigs(conn.connections, conn.name, sigService, systemService);
    }
  }
};

const createSig = async (
  { name }: Connection,
  systemName: string,
  systemService: SystemService,
) => {
  const { id } = await systemService.getByName(systemName);
  const destination = await systemService.getByName(name);

  return { name, systemId: id, type: SigTypes.WORMHOLE, eveId: "XXX-123", destination };
};
