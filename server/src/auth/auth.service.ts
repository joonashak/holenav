import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthenticationError } from "apollo-server-express";
import { compare } from "bcrypt";
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
   * Get JWT token for token authentication given a valid SSO state secret.
   * @param state SSO state secret used to secure the SSO authentication flow.
   * @returns JWT token to be saved on the client.
   */
  async validateSsoLogin(state: string): Promise<string> {
    const { ssoLoginSuccess, character } = await this.ssoSessionService.verifySsoLoginSuccess(
      state,
    );

    if (!ssoLoginSuccess) {
      throw new AuthenticationError("SSO login unsuccessful.");
    }

    const user = await this.userService.findByCharacterOrCreateUser(character);
    return this.createAccessToken(user);
  }

  /**
   * Validate user credentials for local login.
   * @param username Username.
   * @param password Password.
   * @returns User whose valid credentials were supplied or `null` if not successful.
   */
  async validateUserCredentials(username: string, password: string): Promise<User | null> {
    const user = await this.userService.findWithCredentials(username);
    if (!user) {
      return null;
    }

    const { passwordHash } = user.credentials;

    if (user && (await compare(password, passwordHash))) {
      /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
      const { credentials, ...result } = user;
      return result;
    }

    return null;
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

  /**
   * Create new session and get a corresponding JWT token.
   * @param user User to link to session.
   * @returns JWT token to be saved on the client.
   */
  async createAccessToken(user: User): Promise<string> {
    const session = await this.sessionService.create(user);
    const payload: JwtPayload = { sessionId: session.id };
    return this.jwtService.sign(payload);
  }
}
