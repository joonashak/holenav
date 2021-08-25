import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user/user.service";
import { SsoStateService } from "./sso/ssoState/ssoState.service";

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private ssoStateService: SsoStateService,
    private userService: UserService,
  ) {}

  /**
   * Get JWT token for Holenav client-server auth given a valid SSO state secret.
   */
  async login(state: string): Promise<string> {
    // Check SSO login state.
    const { ssoLoginSuccess, character } = await this.ssoStateService.verifySsoLoginSuccess(state);
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

  async validateToken(token: string): Promise<boolean> {
    try {
      const { uid }: any = this.jwtService.decode(token);
      const { tokens } = await this.userService.findByIdWithTokens(uid);
      return tokens.includes(token);
    } catch (error) {
      throw new HttpException("Bad token format.", HttpStatus.BAD_REQUEST);
    }
  }
}
