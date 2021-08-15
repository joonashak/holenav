import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Character, CharacterDocument } from "./character.model";

@Injectable()
export class CharacterService {
  constructor(@InjectModel(Character.name) private characterModel: Model<CharacterDocument>) {}

  async upsert(data: Character) {
    const { esiId, ...rest } = data;
    await this.characterModel.findOneAndUpdate({ esiId }, rest, { upsert: true });
  }
}
