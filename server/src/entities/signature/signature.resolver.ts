import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { SystemService } from "../system/system.service";
import { Signature } from "./signature.model";

@Resolver()
export class SignatureResolver {
  constructor(private systemService: SystemService) {}

  @Mutation((returns) => Signature)
  async addSignature(@Args({ name: "systemId", type: () => String }) systemId: string) {
    console.log("systemId", systemId);
  }
}
