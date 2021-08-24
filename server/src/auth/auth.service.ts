import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { SsoStateService } from "./sso/ssoState/ssoState.service";

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private ssoStateService: SsoStateService) {}

  /**
   * Get JWT token for Holenav client-server auth given a valid SSO state secret.
   */
  async getToken(state: string) {
    const ssoLoginSuccess = await this.ssoStateService.verifySsoLoginSuccess(state);

    // TODO: Figure out if this character is associated with a user account and create
    // new one, if not.

    if (!ssoLoginSuccess) {
      throw new Error("SSO login unsuccessful.");
    }

    return {
      accessToken: this.jwtService.sign({}),
    };
  }
}
