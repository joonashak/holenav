import { createState, useState } from "@hookstate/core";
import tokenStore from "./stores/tokenStore";
import mockUserStore from "./stores/mockUserStore";
import activeCharacterStore from "./stores/activeCharacterStore";

const localState = createState(async () => {
  const activeCharacter = await activeCharacterStore.getActiveCharacter();
  const authToken = await tokenStore.getToken();
  const mockUser = await mockUserStore.getMockUser();
  return { activeCharacter, authToken, mockUser };
});

const useLocalData = () => {
  const state = useState(localState);

  const setActiveCharacter = async (esiId: string) => {
    await activeCharacterStore.setActiveCharacter(esiId);
    state.merge({ activeCharacter: esiId });
  };

  const setDefaultActiveCharacter = async (esiId: string) => {
    if (!state.activeCharacter.value) {
      setActiveCharacter(esiId);
    }
  };

  const setAuthToken = async (authToken: string) => {
    await tokenStore.setToken(authToken);
    state.merge({ authToken });
  };

  const setMockUser = async (mockUser: string | null) => {
    await mockUserStore.setMockUser(mockUser);
    state.merge({ mockUser });
  };

  return {
    get loadingLocalState() {
      return state.promised;
    },
    get activeCharacter() {
      return state.activeCharacter.get();
    },
    get authToken() {
      return state.authToken.get();
    },
    get mockUser() {
      return state.mockUser.get();
    },
    setActiveCharacter,
    setDefaultActiveCharacter,
    setAuthToken,
    setMockUser,
  };
};

export default useLocalData;
