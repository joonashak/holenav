import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Character, CharacterDocument } from "./character.model";

@Injectable()
export class CharacterService {
  constructor(@InjectModel(Character.name) private characterModel: Model<CharacterDocument>) {}

  async findByEsiId(esiId: string): Promise<Character> {
    return this.characterModel.findOne({ esiId });
  }

  /**
   * Upsert character into DB.
   * @param data Character to be upserted.
   * @returns New or updated character.
   */
  async upsert(data: Partial<Character>): Promise<Character> {
    const { esiId, ...rest } = data;
    const newCharacter = await this.characterModel.findOneAndUpdate({ esiId }, rest, {
      upsert: true,
      new: true,
    });
    return newCharacter;
  }

  async remove(esiId: string): Promise<void> {
    await this.characterModel.deleteOne({ esiId });
  }

  async makeMain(character: Character): Promise<Character> {
    const main = await this.characterModel.findOne(character);
    main.isMain = true;
    return await main.save();
  }

  async searchByMain(search: string): Promise<Character[]> {
    // FIXME: Paginate this properly.
    return this.characterModel.find({ name: { $regex: RegExp(search, "i") } }).limit(10);
  }
}
