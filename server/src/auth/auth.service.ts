import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserDocument } from "../user/user.model";
import { UserService } from "../user/user.service";
import { SsoSessionService } from "./sso/ssoSession/ssoSession.service";

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private ssoSessionService: SsoSessionService,
    private userService: UserService,
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

    // Create token and save it in db.
    const { id } = user;
    const token = this.jwtService.sign({ uid: id });
    await this.userService.addToken(id, token);

    return token;
  }

  /**
   * Removes the given `token` from given `user`.
   */
  async endSession(token: string, user: UserDocument): Promise<void> {
    const userWithTokens = await this.userService.findByIdWithTokens(user.id);
    userWithTokens.tokens = userWithTokens.tokens.filter((t) => t !== token);
    await userWithTokens.save();
  }
}
