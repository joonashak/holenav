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

type Subjects = InferSubjects<typeof Folder | typeof User> | "all";

export type FolderAbility = MongoAbility<[FolderAction, Subjects]>;

@Injectable()
export class FolderAbilityFactory {
  createForUser(user: User): FolderAbility {
    const { can, cannot, build } = new AbilityBuilder<FolderAbility>(
      createMongoAbility,
    );

    can(FolderAction.Read, "all");

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
