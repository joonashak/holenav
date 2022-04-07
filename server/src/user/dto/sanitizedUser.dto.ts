import { ObjectType, PickType } from "@nestjs/graphql";
import { User } from "../user.model";

@ObjectType()
export class SanitizedUser extends PickType(User, ["id", "main"]) {}
