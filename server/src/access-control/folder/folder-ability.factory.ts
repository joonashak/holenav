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
import { FolderAction } from "./folder-action.enum";
import { FolderRole } from "./folder-role.model";

type Subjects = InferSubjects<typeof Folder> | "all";

export type FolderAbility = MongoAbility<[FolderAction, Subjects]>;

@Injectable()
export class FolderAbilityFactory {
  createForUser(user: User, roles: FolderRole[]): FolderAbility {
    const { can, build } = new AbilityBuilder<FolderAbility>(
      createMongoAbility,
    );

    // TODO: High system role should give access to folders.
    // TODO: Corp and ally roles.

    const userRoles = roles.filter((r) => r.user.id === user.id);
    for (const role of userRoles) {
      can(role.action, Folder);
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
