import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { SsoToken } from "./sso-token.model";

@Injectable()
export class SsoTokenService {
  constructor(@InjectModel(SsoToken.name) private ssoTokenModel: SsoToken) {}
}
