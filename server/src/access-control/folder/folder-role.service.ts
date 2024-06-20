import { User } from "@joonashak/nestjs-clone-bay";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Cache } from "cache-manager";
import { Model } from "mongoose";
import { FolderRole } from "./folder-role.model";

@Injectable()
export class FolderRoleService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectModel(FolderRole.name) private folderRoleModel: Model<FolderRole>,
  ) {}

  async findRoles(user: User, folderId: string): Promise<FolderRole[]> {
    return this.cacheManager.wrap(this.cacheKey(user.id, folderId), async () =>
      this.folderRoleModel.find({ user, folderId }),
    );
  }

  private cacheKey(userId: string, folderId: string): string {
    return `folder-role-${userId}-${folderId}`;
  }
}
