import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Role, RoleDocument } from "./role.model";
import Roles from "./roles.enum";

@Injectable()
export class RoleService {
  constructor(@InjectModel(Role.name) private roleModel: Model<RoleDocument>) {}

  async create(role: Roles): Promise<Role> {
    const newRole = await this.roleModel.create({ role });
    return newRole;
  }
}
