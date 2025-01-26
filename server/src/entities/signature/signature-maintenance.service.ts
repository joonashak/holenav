import { Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import dayjs from "dayjs";
import { Model } from "mongoose";
import { ConnectionDocument } from "../connection/connection.model";
import { Signature } from "./signature.model";

/** Max age for signatures, in days. */
const ageThresholdDays = 7;

export class SignatureMaintenanceService {
  private logger = new Logger(SignatureMaintenanceService.name);

  constructor(
    @InjectModel(Signature.name) private signatureModel: Model<Signature>,
  ) {}

  async cleanUp(removedConnections: ConnectionDocument[]) {
    const { deletedCount } = await this.signatureModel.deleteMany({
      $or: [
        { connection: { $in: removedConnections } },
        {
          createdAt: {
            $lt: dayjs().subtract(ageThresholdDays, "days").toDate(),
          },
        },
      ],
    });

    this.logger.debug(`Cleaned up ${deletedCount} signature(s).`);
  }
}
