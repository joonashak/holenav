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
  async getSsoState(): Promise<string> {
    const { value } = await this.ssoSessionModel.create({
      value: uuid(),
      expiry: dayjs().add(5, "minute"),
    });

    return value;
  }

  /**
   * Remove given SSO state secret.
   */
  async removeSsoSession(state: string) {
    await this.ssoSessionModel.findOneAndRemove({ value: state });
  }

  /**
   * Verify given SSO state secret to be valid and not expired.
   */
  async verifySsoSession(state: string): Promise<SsoSession> {
    const currentState = await this.ssoSessionModel.findOne({ value: state });

    if (dayjs().isAfter(currentState.expiry)) {
      await this.removeSsoSession(state);
      throw new Error("SSO state expired.");
    }

    return currentState;
  }

  /**
   * Mark given (and valid) SSO state with a successful login.
   */
  async setSsoLoginSuccess(state: string, character: Character) {
    await this.verifySsoSession(state);
    await this.ssoSessionModel.findOneAndUpdate(
      { value: state },
      { ssoLoginSuccess: true, character },
    );
  }

  /**
   * Verify that given state is valid and is associated with a successful SSO login.
   *
   * The given SSO state secret is always removed after this operation.
   */
  async verifySsoLoginSuccess(state: string): Promise<SsoSession> {
    const ssoState = await this.verifySsoSession(state);
    await this.removeSsoSession(state);
    return ssoState;
  }
}
