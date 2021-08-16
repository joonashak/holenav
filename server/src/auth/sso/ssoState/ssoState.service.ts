import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import dayjs from "dayjs";
import { Model } from "mongoose";
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
  async verifySsoState(state: string) {
    const { expiry } = await this.ssoStateModel.findOne({ value: state });

    if (dayjs().isAfter(expiry)) {
      await this.removeSsoState(state);
      throw new Error("SSO state expired.");
    }
  }
}
