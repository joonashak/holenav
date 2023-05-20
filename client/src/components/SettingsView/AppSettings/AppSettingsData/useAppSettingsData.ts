import { useState } from "@hookstate/core";
import { appSettingsState } from ".";

const useAppSettingsData = () => {
  const state = useState(appSettingsState);

  return {
    ...state.value,
  };
};

export default useAppSettingsData;
