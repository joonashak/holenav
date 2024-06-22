import {
  AbilityBuilder,
  ExtractSubjectType,
  InferSubjects,
  MongoAbility,
  createMongoAbility,
} from "@casl/ability";
import { User } from "@joonashak/nestjs-clone-bay";
import { Injectable } from "@nestjs/common";
import { Folder } from "../../entities/folder/folder.model";
import { FolderAction } from "./folder-role/folder-action.enum";
import { FolderRole } from "./folder-role/folder-role.model";

type Subjects = InferSubjects<typeof Folder> | "all";

export type FolderAbility = MongoAbility<[FolderAction, Subjects]>;

@Injectable()
export class FolderAbilityFactory {
  createForUser(user: User, roles: FolderRole[]): FolderAbility {
    const { can, build } = new AbilityBuilder<FolderAbility>(
      createMongoAbility,
    );

    // TODO: High system role should give access to folders.

    const userRoles = this.buildUserRoles(user, roles);
    for (const role of userRoles) {
      can(role.action, Folder);
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }

  private buildUserRoles(user: User, roles: FolderRole[]): FolderRole[] {
    return roles.filter((role) => {
      // Lot of nulls and undefineds here so let's check for them explicitly.
      if (role.userId) {
        return role.userId === user.id;
      }
      if (role.corporationEveId) {
        return role.corporationEveId === user.main.corporation.eveId;
      }
      if (role.allianceEveId) {
        return role.allianceEveId === user.main.alliance?.eveId;
      }
      return role.public;
    });
  }
}
