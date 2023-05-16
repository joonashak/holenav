import { IntersectionType, ObjectType, PickType } from "@nestjs/graphql";
import { User } from "../user.model";
import { SanitizedUser } from "./sanitized-user.dto";

@ObjectType()
export class SanitizedUserForManager extends IntersectionType(
  SanitizedUser,
  PickType(User, ["systemRole"]),
) {}
