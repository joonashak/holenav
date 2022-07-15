import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { Signature } from "../../signature/signature.model";
import MassStatus from "../mass-status.enum";
import { Wormhole } from "../wormhole.model";

@InputType()
export class AddWormholeInput {
  @Field((type) => [WormholeInput])
  wormholes: WormholeInput[];
}

@InputType()
export class WormholeInput {
  @Field()
  name: string;

  @Field()
  systemName: string;

  @Field({ nullable: true })
  destinationName: string | null;

  @Field()
  eveId: string;

  @Field()
  type: string;

  @Field()
  reverseType: string;

  @Field()
  eol: boolean;

  @Field((type) => MassStatus)
  massStatus: MassStatus;
}

@ObjectType()
export class AddWormholeResult {
  @Field((type) => [Wormhole])
  addedWormholes: Wormhole[];

  @Field((type) => [Signature])
  removedSignatures: Signature[];
}
