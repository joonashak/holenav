import { Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import dayjs from "dayjs";
import { Model } from "mongoose";
import { Connection } from "./connection.model";

/** How many hours after going EOL connection should be removed. */
const eolThresholdHours = 6;

/** Max age for connections, in days. */
const ageThresholdDays = 3;

export class ConnectionMaintenanceService {
  private logger = new Logger(ConnectionMaintenanceService.name);

  constructor(
    @InjectModel(Connection.name) private connectionModel: Model<Connection>,
  ) {}

  /**
   * Clean up connection collection.
   *
   * Removes old connections based on both EOL time and total age. Returns
   * removed connections so their associated signatures can be removed easily.
   */
  async cleanUp() {
    const connections = await this.connectionModel.find({
      $or: [
        {
          eolAt: { $lt: dayjs().subtract(eolThresholdHours, "hours").toDate() },
        },
        {
          createdAt: {
            $lt: dayjs().subtract(ageThresholdDays, "days").toDate(),
          },
        },
      ],
    });

    const { deletedCount } = await this.connectionModel.deleteMany({
      _id: { $in: connections.map((c) => c._id) },
    });

    this.logger.debug(`Cleaned up ${deletedCount} connection(s).`);
    return connections;
  }
}
