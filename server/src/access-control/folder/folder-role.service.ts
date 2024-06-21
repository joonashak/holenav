import { CloneBayUserService, User } from "@joonashak/nestjs-clone-bay";
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

  async findRoles(user: User, folderId: string): Promise<FolderRole[]> {
    return this.cacheManager.wrap(this.cacheKey(user, folderId), async () =>
      this.folderRoleModel.find({ user, folderId }),
    );
  }

  async create(
    userId: string,
    folderId: string,
    action: FolderAction,
  ): Promise<FolderRole> {
    const user = await this.userService.findById(userId);
    const role = await this.folderRoleModel.create({ user, folderId, action });
    await this.invalidateCache(user, folderId);
    return role.populate("user");
  }

  private cacheKey(user: User, folderId: string): string {
    return `folder-role-${user.id}-${folderId}`;
  }

  private async invalidateCache(user: User, folderId: string): Promise<void> {
    await this.cacheManager.del(this.cacheKey(user, folderId));
  }
}
