import { createState, useState } from "@hookstate/core";
import tokenStore from "./stores/tokenStore";
import mockUserStore from "./stores/mockUserStore";
import activeCharacterStore from "./stores/activeCharacterStore";
import pollSettingStore from "./stores/pollSettingStore";
import devKeyStore from "./stores/devKeyStore";

const localState = createState(async () => {
  const activeCharacter = await activeCharacterStore.getActiveCharacter();
  const authToken = await tokenStore.getToken();
  const mockUser = await mockUserStore.getMockUser();
  const pollSetting = await pollSettingStore.getPollSetting();
  const devKey = await devKeyStore.getDevKey();
  return { activeCharacter, authToken, mockUser, pollSetting, devKey };
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

  const setAuthToken = async (authToken: string | null) => {
    await tokenStore.setToken(authToken);
    state.merge({ authToken });
  };

  const setMockUser = async (mockUser: string | null) => {
    await mockUserStore.setMockUser(mockUser);
    state.merge({ mockUser });
  };

  const setPollSetting = async (pollSetting: boolean) => {
    await pollSettingStore.setPollSetting(pollSetting);
    state.merge({ pollSetting });
  };

  const setDevKey = async (devKey: string) => {
    await devKeyStore.setDevKey(devKey);
    state.merge({ devKey });
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
    get pollSetting() {
      return state.pollSetting.get();
    },
    get devKey() {
      return state.devKey.get() || undefined;
    },
    setActiveCharacter,
    setDefaultActiveCharacter,
    setAuthToken,
    setMockUser,
    setPollSetting,
    setDevKey,
  };
};

export default useLocalData;
