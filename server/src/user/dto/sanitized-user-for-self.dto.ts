import { ObjectType, OmitType } from "@nestjs/graphql";
import { HolenavUser } from "../user.model";

@ObjectType()
export class SanitizedUserForSelf extends OmitType(HolenavUser, [
  "credentials",
]) {}
