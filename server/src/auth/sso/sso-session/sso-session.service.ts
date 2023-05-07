import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import dayjs from "dayjs";
import { Model } from "mongoose";
import { Character } from "../../../entities/character/character.model";
import { v4 as uuid } from "uuid";
import { SsoSession, SsoSessionDocument } from "./sso-session.model";
import SsoSessionType from "./sso-session-type.enum";
import { User } from "../../../user/user.model";
import { AuthenticationError } from "apollo-server-express";

@Injectable()
export class SsoSessionService {
  constructor(@InjectModel(SsoSession.name) private ssoSessionModel: Model<SsoSessionDocument>) {}

  /**
   * Create new SSO state.
   */
  async createSsoSession(user: User): Promise<SsoSession> {
    return this.ssoSessionModel.create({
      key: uuid(),
      type: user ? SsoSessionType.ADD_CHARACTER : SsoSessionType.LOGIN,
      user,
      expiry: dayjs().add(5, "minute"),
    });
  }

  /**
   * Remove given SSO state secret.
   */
  async removeSsoSession(key: string) {
    await this.ssoSessionModel.findOneAndRemove({ key });
  }

  /**
   * Verify given SSO state secret to be valid and not expired.
   */
  async verifySsoSession(key: string): Promise<SsoSession> {
    const currentSession = await this.ssoSessionModel.findOne({ key }).populate("user");

    if (!currentSession) {
      throw new AuthenticationError("SSO session not found.");
    }

    if (!currentSession.expiry || dayjs().isAfter(currentSession.expiry)) {
      await this.removeSsoSession(key);
      throw new AuthenticationError("SSO session expired.");
    }

    return currentSession;
  }

  /**
   * Mark given (and valid) SSO state with a successful login.
   */
  async setSsoLoginSuccess(key: string, character: Character) {
    await this.verifySsoSession(key);
    await this.ssoSessionModel.findOneAndUpdate({ key }, { ssoLoginSuccess: true, character });
  }

  /**
   * Verify that given state is valid and is associated with a successful SSO login.
   *
   * The given SSO state secret is always removed after this operation.
   */
  async verifySsoLoginSuccess(key: string): Promise<SsoSession> {
    const ssoSession = await this.verifySsoSession(key);

    if (ssoSession.type !== SsoSessionType.LOGIN) {
      throw new AuthenticationError("Invalid SSO login type.");
    }

    if (!ssoSession.ssoLoginSuccess) {
      throw new AuthenticationError("SSO login failed.");
    }

    await this.removeSsoSession(key);
    return ssoSession;
  }

  async removeExpiredSsoSessions(): Promise<void> {
    await this.ssoSessionModel.remove({
      expiry: { $lte: new Date() },
    });
  }
}
