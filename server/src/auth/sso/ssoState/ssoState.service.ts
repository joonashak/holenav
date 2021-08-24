import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import dayjs from "dayjs";
import { Model } from "mongoose";
import { Character } from "../../../entities/character/character.model";
import { v4 as uuid } from "uuid";
import { SsoState, SsoStateDocument } from "./ssoState.model";

@Injectable()
export class SsoStateService {
  constructor(@InjectModel(SsoState.name) private ssoStateModel: Model<SsoStateDocument>) {}

  /**
   * Create new SSO state.
   */
  async getSsoState(): Promise<string> {
    const { value } = await this.ssoStateModel.create({
      value: uuid(),
      expiry: dayjs().add(5, "minute"),
    });

    return value;
  }

  /**
   * Remove given SSO state secret.
   */
  async removeSsoState(state: string) {
    await this.ssoStateModel.findOneAndRemove({ value: state });
  }

  /**
   * Verify given SSO state secret to be valid and not expired.
   */
  async verifySsoState(state: string): Promise<SsoState> {
    const currentState = await this.ssoStateModel.findOne({ value: state });

    if (dayjs().isAfter(currentState.expiry)) {
      await this.removeSsoState(state);
      throw new Error("SSO state expired.");
    }

    return currentState;
  }

  /**
   * Mark given (and valid) SSO state with a successful login.
   */
  async setSsoLoginSuccess(state: string, character: Character) {
    await this.verifySsoState(state);
    await this.ssoStateModel.findOneAndUpdate(
      { value: state },
      { ssoLoginSuccess: true, character },
    );
  }

  /**
   * Verify that given state is valid and is associated with a successful SSO login.
   *
   * The given SSO state secret is always removed after this operation.
   */
  async verifySsoLoginSuccess(state: string): Promise<SsoState> {
    const ssoState = await this.verifySsoState(state);
    await this.removeSsoState(state);
    return ssoState;
  }
}
