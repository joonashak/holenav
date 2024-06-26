import { AuthenticationError } from "@nestjs/apollo";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { HolenavUser } from "../user/user.model";
import { UserService } from "../user/user.service";
import { Session } from "./session/session.model";
import { SessionService } from "./session/session.service";
import { SsoSessionService } from "./sso/sso-session/sso-session.service";
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
   * Get JWT token for token authentication given a valid SSO state secret.
   *
   * @param state SSO state secret used to secure the SSO authentication flow.
   * @returns JWT token to be saved on the client.
   */
  async validateSsoLogin(state: string): Promise<string> {
    const { ssoLoginSuccess, character } =
      await this.ssoSessionService.verifySsoLoginSuccess(state);

    if (!ssoLoginSuccess) {
      throw new AuthenticationError("SSO login unsuccessful.");
    }

    const user = await this.userService.findByCharacterOrCreateUser(character);
    return this.createAccessToken(user);
  }

  /**
   * Verify that `token` is a valid JWT token.
   *
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
      throw new AuthenticationError(
        "Access token does not contain a session ID.",
      );
    }

    return payload;
  }

  /**
   * Create new session and get a corresponding JWT token.
   *
   * @param user User to link to session.
   * @returns JWT token to be saved on the client.
   */
  async createAccessToken(user: HolenavUser): Promise<string> {
    const session = await this.sessionService.create(user);
    const payload: JwtPayload = { sessionId: session.id };
    return this.jwtService.sign(payload);
  }

  async logout(session: Session): Promise<void> {
    await this.sessionService.deleteSession(session.id);
  }
}
