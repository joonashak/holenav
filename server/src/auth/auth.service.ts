import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthenticationError } from "apollo-server-express";
import { User } from "../user/user.model";
import { UserService } from "../user/user.service";
import { SessionService } from "./session/session.service";
import { SsoSessionService } from "./sso/ssoSession/ssoSession.service";
import { JwtPayload } from "./types";

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private ssoSessionService: SsoSessionService,
    private userService: UserService,
    private sessionService: SessionService,
  ) {}

  /**
   * Get JWT token for Holenav client-server auth given a valid SSO state secret.
   */
  async login(state: string): Promise<string> {
    // Check SSO login state.
    const { ssoLoginSuccess, character } = await this.ssoSessionService.verifySsoLoginSuccess(
      state,
    );
    if (!ssoLoginSuccess) {
      throw new Error("SSO login unsuccessful.");
    }

    // Create new user if character not found.
    let user = await this.userService.findByCharacter(character);
    if (!user) {
      user = await this.userService.create({ main: character });
    }

    return this.createAccessToken(user);
  }

  /**
   * Verify that `token` is a valid JWT token.
   * @param token JWT token.
   * @returns Decoded JWT payload object.
   */
  verifyToken(token: string): JwtPayload {
    let payload: JwtPayload;

    try {
      payload = this.jwtService.verify(token);
    } catch {
      throw new AuthenticationError("Access token is invalid.");
    }

    if (!Object.keys(payload).includes("sessionId")) {
      throw new AuthenticationError("Access token does not contain a session ID.");
    }

    return payload;
  }

  private async createAccessToken(user: User): Promise<string> {
    const session = await this.sessionService.create(user);
    return this.jwtService.sign({ sessionId: session.id });
  }
}
