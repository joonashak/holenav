import { Downgraded, useState } from "@hookstate/core";
import { appSettingsState } from ".";
import useAuthenticatedMutation from "../../../../auth/useAuthenticatedMutation";
import {
  SetRegistrationEnabledDocument,
  SetRegistrationEnabledMutation,
  SetRegistrationEnabledMutationVariables,
} from "../../../../generated/graphqlOperations";
import useNotification from "../../../GlobalNotification/useNotification";

const useAppSettingsData = () => {
  const state = useState(appSettingsState);
  const { showSuccessNotification } = useNotification();

  const [setRegistrationEnabledMutation] = useAuthenticatedMutation<
    SetRegistrationEnabledMutation,
    SetRegistrationEnabledMutationVariables
  >(SetRegistrationEnabledDocument, {
    onCompleted: ({ updateAppData }) => {
      console.log(updateAppData);
      //state.registration.merge(() => ({ enabled: true }));
      state.registration.enabled.set(updateAppData.settings.registration.enabled);
      console.log("asd");
      console.log(state.registration.get());
    },
  });

  const setRegistrationEnabled = async (enabled: boolean) => {
    await setRegistrationEnabledMutation({ variables: { enabled } });
    showSuccessNotification("Settings updated.");
  };

  return {
    // registration: {
    //   get enabled() {
    //     return state.registration;
    //   },
    // },
    setRegistrationEnabled,
    ...state.attach(Downgraded).get(),
  };
};

export default useAppSettingsData;
