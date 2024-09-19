import { ObjectType, OmitType } from "@nestjs/graphql";
import { Map } from "../map.model";

@ObjectType()
export class FindMap extends OmitType(Map, ["user"]) {}
