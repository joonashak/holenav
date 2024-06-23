import { User } from "@joonashak/nestjs-clone-bay";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Cache } from "cache-manager";
import { FilterQuery, Model } from "mongoose";
import { CreateFolderRoleDto } from "./dto/create-folder-role.dto";
import { FolderRole } from "./folder-role.model";

@Injectable()
export class FolderRoleService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectModel(FolderRole.name) private folderRoleModel: Model<FolderRole>,
  ) {}

  /**
   * Find role by folder.
   *
   * This is cached and should be used for authorization.
   */
  async findRoles(folderId: string): Promise<FolderRole[]> {
    return this.cacheManager.wrap(this.cacheKey(folderId), async () =>
      this.folderRoleModel.find({ folderId }),
    );
  }

  /**
   * Find all folder roles applicable to user.
   *
   * Searches for folder roles by user, corporation, and possible alliance. Also
   * includes any public roles.
   *
   * Note that this is not cached and should be used sparingly.
   */
  async findRolesForUser(user: User): Promise<FolderRole[]> {
    const $or: FilterQuery<FolderRole>["$or"] = [
      { userId: user.id },
      { corporationEveId: user.main.corporation.eveId },
      { public: true },
    ];

    if (user.main.alliance) {
      $or.push({ allianceEveId: user.main.alliance.eveId });
    }

    return this.folderRoleModel.find({ $or });
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
