import { ObjectType, PickType } from "@nestjs/graphql";
import { HolenavUser } from "../user.model";

@ObjectType()
export class SanitizedUser extends PickType(HolenavUser, ["id", "main"]) {}
