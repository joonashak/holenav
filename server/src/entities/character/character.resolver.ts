import { Args, Query, Resolver } from "@nestjs/graphql";
import { RequireSystemRole } from "../../auth/decorators/role.decorator";
import SystemRole from "../../user/roles/system-role.enum";
import { Character } from "./character.model";
import { CharacterService } from "./character.service";

@Resolver()
export class CharacterResolver {
  constructor(private characterService: CharacterService) {}

  @RequireSystemRole(SystemRole.MANAGER)
  @Query((returns) => [Character])
  async searchCharactersByMain(@Args("search") search: string): Promise<Character[]> {
    return this.characterService.searchByMain(search);
  }
}
