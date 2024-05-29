import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { EsiService } from "../../esi/esi.service";
import { CharacterDocument, HolenavCharacter } from "./character.model";

@Injectable()
export class CharacterService {
  constructor(
    @InjectModel(HolenavCharacter.name)
    private characterModel: Model<CharacterDocument>,
    private esiService: EsiService,
  ) {}

  async findByEsiId(esiId: string): Promise<HolenavCharacter> {
    return this.characterModel.findOne({ esiId });
  }

  async create(
    character: Partial<HolenavCharacter>,
  ): Promise<HolenavCharacter> {
    const newCharacter = await this.characterModel.create(character);
    const charWithInfo = await this.appendPublicInfoFromEsi(newCharacter);
    return charWithInfo;
  }

  /**
   * Upsert character into DB.
   *
   * @param data Character to be upserted.
   * @returns New or updated character.
   */
  async upsert(data: Partial<HolenavCharacter>): Promise<HolenavCharacter> {
    const { esiId, ...rest } = data;
    const exists = !!(await this.characterModel.findOne({ esiId }));
    const character = exists
      ? await this.characterModel.findOneAndUpdate({ esiId }, rest, {
          new: true,
        })
      : this.create(data);
    return character;
  }

  async remove(esiId: string): Promise<void> {
    await this.characterModel.deleteOne({ esiId });
  }

  async makeMain(character: HolenavCharacter): Promise<HolenavCharacter> {
    const main = await this.characterModel.findOne(character);
    main.isMain = true;
    return await main.save();
  }

  async searchByMain(search: string): Promise<HolenavCharacter[]> {
    // FIXME: Paginate this properly.
    return this.characterModel
      .find({ name: { $regex: RegExp(search, "i") } })
      .limit(10);
  }

  private async appendPublicInfoFromEsi(
    character: CharacterDocument,
  ): Promise<CharacterDocument> {
    const { corporation_id, alliance_id } =
      await this.esiService.getCharacterPublicInfo(character.esiId);

    const { px512x512 } = await this.esiService.getCharacterPortraitUrl(
      character.esiId,
    );
    character.portraitUrl = px512x512;

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
