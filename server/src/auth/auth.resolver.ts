import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import AccessTokenDto from "./dto/accessToken.dto";

@Resolver()
export default class AuthResolver {
  constructor(private authService: AuthService) {}

  /**
   * Callback for client to get Holenav's auth token.
   */
  @Mutation((returns) => AccessTokenDto)
  async getToken(@Args("state") state: string): Promise<AccessTokenDto> {
    const accessToken = await this.authService.login(state);
    return { accessToken };
  }
}
