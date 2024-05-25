import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { SsoToken, SsoTokenDocument } from "./sso-token.model";

@Injectable()
export class SsoTokenService {
  constructor(
    @InjectModel(SsoToken.name) private ssoTokenModel: Model<SsoTokenDocument>,
  ) {}

  async create(ssoToken: SsoToken): Promise<SsoTokenDocument> {
    return this.ssoTokenModel.create(ssoToken);
  }
}
