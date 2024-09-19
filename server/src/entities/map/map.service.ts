import { User } from "@joonashak/nestjs-clone-bay";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateMapDto } from "./dto/create-map.dto";
import { Map, MapDocument } from "./map.model";

@Injectable()
export class MapService {
  constructor(@InjectModel(Map.name) private mapModel: Model<MapDocument>) {}

  async createMap(input: CreateMapDto, user: User): Promise<Map> {
    return this.mapModel.create({ ...input, user });
  }
}
