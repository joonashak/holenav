import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Cache } from "cache-manager";
import { Model } from "mongoose";
import { FolderAction } from "./folder-action.enum";
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

  async create(
    userId: string,
    folderId: string,
    action: FolderAction,
  ): Promise<FolderRole> {
    const role = await this.folderRoleModel.create({
      userId,
      folderId,
      action,
    });
    await this.invalidateCache(folderId);
    return role;
  }

  private cacheKey(folderId: string): string {
    return `folder-roles-${folderId}`;
  }

  private async invalidateCache(folderId: string): Promise<void> {
    await this.cacheManager.del(this.cacheKey(folderId));
  }
}
