import { ObjectType, OmitType } from "@nestjs/graphql";
import { User } from "../user.model";

@ObjectType()
export class SanitizedUserForSelf extends OmitType(User, ["credentials"]) {}
