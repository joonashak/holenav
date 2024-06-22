import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Cache } from "cache-manager";
import { Model } from "mongoose";
import { CreateFolderRoleDto } from "./dto/create-folder-role.dto";
import { FolderRole } from "./folder-role.model";

@Injectable()
export class FolderRoleService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectModel(FolderRole.name) private folderRoleModel: Model<FolderRole>,
  ) {}

  async findRoles(folderId: string): Promise<FolderRole[]> {
    return this.cacheManager.wrap(this.cacheKey(folderId), async () =>
      this.folderRoleModel.find({ folderId }),
    );
  }

  async create(role: CreateFolderRoleDto): Promise<FolderRole> {
    const created = await this.folderRoleModel.create(role);
    await this.invalidateCache(role.folderId);
    return created;
  }

  private cacheKey(folderId: string): string {
    return `folder-roles-${folderId}`;
  }

  private async invalidateCache(folderId: string): Promise<void> {
    await this.cacheManager.del(this.cacheKey(folderId));
  }
}
