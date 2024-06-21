import { CloneBayUserService } from "@joonashak/nestjs-clone-bay";
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
    private userService: CloneBayUserService,
  ) {}

  async findRoles(folderId: string): Promise<FolderRole[]> {
    return this.cacheManager.wrap(this.cacheKey(folderId), async () =>
      this.folderRoleModel.find({ folderId }).populate("user"),
    );
  }

  async create(
    userId: string,
    folderId: string,
    action: FolderAction,
  ): Promise<FolderRole> {
    const user = await this.userService.findById(userId);
    const role = await this.folderRoleModel.create({ user, folderId, action });
    await this.invalidateCache(folderId);
    return role.populate("user");
  }

  private cacheKey(folderId: string): string {
    return `folder-roles-${folderId}`;
  }

  private async invalidateCache(folderId: string): Promise<void> {
    await this.cacheManager.del(this.cacheKey(folderId));
  }
}
