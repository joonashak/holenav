import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import dayjs from "dayjs";
import { Model } from "mongoose";
import { Character } from "../../../entities/character/character.model";
import { v4 as uuid } from "uuid";
import { SsoSession, SsoSessionDocument } from "./ssoSession.model";

@Injectable()
export class SsoSessionService {
  constructor(@InjectModel(SsoSession.name) private ssoSessionModel: Model<SsoSessionDocument>) {}

  /**
   * Create new SSO state.
   */
  async createSsoSession(): Promise<SsoSession> {
    return this.ssoSessionModel.create({
      key: uuid(),
      expiry: dayjs().add(5, "minute"),
    });
  }

  /**
   * Remove given SSO state secret.
   */
  async removeSsoSession(state: string) {
    await this.ssoSessionModel.findOneAndRemove({ key: state });
  }

  /**
   * Verify given SSO state secret to be valid and not expired.
   */
  async verifySsoSession(key: string): Promise<SsoSession> {
    const currentSession = await this.ssoSessionModel.findOne({ key });

    if (dayjs().isAfter(currentSession.expiry)) {
      await this.removeSsoSession(key);
      throw new Error("SSO state expired.");
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
    await this.removeSsoSession(key);
    return ssoSession;
  }
}
