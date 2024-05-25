import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Scope,
} from "@nestjs/common";
import { CONTEXT } from "@nestjs/graphql";
import { Folder } from "./folder.model";

@Injectable({ scope: Scope.REQUEST })
export class ActiveFolderService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(@Inject(CONTEXT) private context: any) {}

  populateWithActiveFolder<T>(objects: T[]): Array<T & { folder: Folder }> {
    const { activeFolder } = this.context.req;

    if (!activeFolder) {
      throw new InternalServerErrorException(
        "Active folder was not set internally. Please report this as a bug.",
      );
    }

    return objects.map((o) => ({ ...o, folder: activeFolder }));
  }
}
