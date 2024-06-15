import { CloneBayUserService } from "@joonashak/nestjs-clone-bay";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import {
  UserPreferences,
  UserPreferencesDocument,
} from "./user-preferences.model";

@Injectable()
export class UserPreferencesService {
  constructor(
    @InjectModel(UserPreferences.name)
    private userPreferencesModel: Model<UserPreferencesDocument>,
    private userService: CloneBayUserService,
  ) {}

  /**
   * Find preferences for user.
   *
   * A user preferences document is not created when a new user signs up. This
   * method safely creates a default user preferences document for the given
   * user if one does not exist.
   */
  async findByUserId(userId: string): Promise<UserPreferencesDocument> {
    const user = await this.userService.findById(userId);
    const existing = await this.userPreferencesModel
      .findOne({ user })
      .populate("user");

    if (!existing) {
      await this.userPreferencesModel.create({ user });
      return this.findByUserId(userId);
    }

    return existing;
  }
}
