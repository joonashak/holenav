import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Character, CharacterDocument } from "./character.model";

@Injectable()
export class CharacterService {
  constructor(@InjectModel(Character.name) private characterModel: Model<CharacterDocument>) {}

  /**
   * Upsert character into DB.
   * @param data Character to be upserted.
   * @returns New or updated character.
   */
  async upsert(data: Character): Promise<Character> {
    const { esiId, ...rest } = data;
    const newCharacter = await this.characterModel.findOneAndUpdate({ esiId }, rest, {
      upsert: true,
      new: true,
    });
    return newCharacter;
  }
}
