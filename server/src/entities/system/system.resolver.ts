/* eslint-disable @typescript-eslint/no-unused-vars */
import { Args, Query, Resolver } from "@nestjs/graphql";
import { System } from "./system.model";

@Resolver()
// @RequireAuthentication()
export class SystemResolver {
  constructor() {}

  // @RequireFolderAccess(FolderAction.Read)
  @Query(() => System, { nullable: true })
  async getSystemByName(
    @Args("name") name: string,
    @Args("folderId") folderId: string,
  ) {
    return null;
  }
}
