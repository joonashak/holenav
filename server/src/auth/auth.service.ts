import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async getToken(state: string) {
    // TODO: verify state
    return {
      accessToken: this.jwtService.sign({}),
    };
  }
}
