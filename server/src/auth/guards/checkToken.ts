import { JwtService } from "@nestjs/jwt";
import { User } from "../../user/user.model";
import { UserService } from "../../user/user.service";

/**
 * Check for a valid token in request headers.
 * @returns {User} Logged in user.
 */
export default async (
  request: any,
  jwtService: JwtService,
  userService: UserService,
): Promise<User> => {
  let accessToken = null;
  let tokens = [];
  let user = null;

  try {
    accessToken = request.headers.accesstoken;
    const { uid }: any = jwtService.decode(accessToken);
    user = await userService.findByIdWithTokens(uid);
    // Implicitly throws if user not found.
    tokens = user.tokens;
  } catch {
    throw new Error("Bad token.");
  }

  if (!tokens.includes(accessToken)) {
    throw new Error("Missing token");
  }

  return user;
};
