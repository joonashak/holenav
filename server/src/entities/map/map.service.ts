import { User } from "@joonashak/nestjs-clone-bay";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateMapDto } from "./dto/create-map.dto";
import { UpdateMapDto } from "./dto/update-map.dto";
import { Map, MapDocument } from "./map.model";

@Injectable()
export class MapService {
  constructor(@InjectModel(Map.name) private mapModel: Model<MapDocument>) {}

  async createMap(input: CreateMapDto, user: User): Promise<Map> {
    return this.mapModel.create({ ...input, user });
  }

  async findMapsForUser(user: User): Promise<Map[]> {
    return this.mapModel.find({ user });
  }

  async updateMap(map: UpdateMapDto, user: User): Promise<Map> {
    const { id, ...update } = map;
    const updated = await this.mapModel.findOneAndUpdate(
      { _id: id, user },
      update,
      {
        returnDocument: "after",
      },
    );
    if (!updated) {
      throw new NotFoundException();
    }
    return updated;
  }

  async removeMap(id: string, user: User): Promise<void> {
    await this.mapModel.deleteOne({ _id: id, user });
  }
}
