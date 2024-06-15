import { User } from "@joonashak/nestjs-clone-bay";
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
  ) {}

  /**
   * Find preferences for user.
   *
   * A user preferences document is not created when a new user signs up. This
   * method safely creates a default user preferences document for the given
   * user if one does not exist.
   */
  async findByUserId(user: User): Promise<UserPreferencesDocument> {
    const existing = await this.userPreferencesModel.findOne({ user });

    if (!existing) {
      return this.userPreferencesModel.create({ user });
    }

    return existing;
  }
}
