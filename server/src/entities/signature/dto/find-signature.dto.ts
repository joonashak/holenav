import { ObjectType } from "@nestjs/graphql";
import { Signature } from "../signature.model";

@ObjectType()
export class FindSignature extends Signature {}
