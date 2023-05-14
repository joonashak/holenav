import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Character, CharacterDocument } from "./character.model";
import { EsiService } from "../../esi/esi.service";

@Injectable()
export class CharacterService {
  constructor(
    @InjectModel(Character.name) private characterModel: Model<CharacterDocument>,
    private esiService: EsiService,
  ) {}

  async findByEsiId(esiId: string): Promise<Character> {
    return this.characterModel.findOne({ esiId });
  }

  async create(character: Partial<Character>): Promise<Character> {
    let newCharacter = await this.characterModel.create(character);
    newCharacter = await this.appendPublicInfoFromEsi(newCharacter);
    return newCharacter;
  }

  /**
   * Upsert character into DB.
   * @param data Character to be upserted.
   * @returns New or updated character.
   */
  async upsert(data: Partial<Character>): Promise<Character> {
    const { esiId, ...rest } = data;
    const exists = !!(await this.characterModel.findOne({ esiId }));
    const character = exists
      ? await this.characterModel.findOneAndUpdate({ esiId }, rest, { new: true })
      : this.create(data);
    return character;
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

  private async appendPublicInfoFromEsi(character: CharacterDocument): Promise<CharacterDocument> {
    const { corporation_id, alliance_id } = await this.esiService.getCharacterPublicInfo(
      character.esiId,
    );

    const { name, ticker } = await this.esiService.getCorporationPublicInfo(
      corporation_id.toString(),
    );

    character.corporation = {
      esiId: corporation_id.toString(),
      name,
      ticker,
    };

    if (alliance_id) {
      const allianceInfo = alliance_id
        ? await this.esiService.getAlliancePublicInfo(alliance_id.toString())
        : undefined;
      character.alliance = {
        esiId: alliance_id.toString(),
        name: allianceInfo.name,
        ticker: allianceInfo.ticker,
      };
    }

    await character.save();
    return character;
  }
}
