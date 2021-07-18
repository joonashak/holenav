import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { System, SystemDocument } from "./system.model";

@Injectable()
export class SystemService {
  constructor(
    @InjectModel(System.name) private systemModel: Model<SystemDocument>,
  ) {}

  list() {
    return this.systemModel.find().exec();
  }
}
