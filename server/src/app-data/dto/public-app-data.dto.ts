import { ObjectType, PickType } from "@nestjs/graphql";
import { AppData } from "../app-data.model";

@ObjectType()
export class PublicAppData extends PickType(AppData, ["motd"]) {}
