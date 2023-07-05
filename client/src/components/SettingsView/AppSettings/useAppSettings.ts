import useAuthenticatedMutation from "../../../auth/useAuthenticatedMutation";
import useAuthenticatedQuery from "../../../auth/useAuthenticatedQuery";
import {
  AppSettingsDocument,
  AppSettingsQuery,
  AppSettingsQueryVariables,
  SetRegistrationEnabledDocument,
  SetRegistrationEnabledMutation,
  SetRegistrationEnabledMutationVariables,
} from "../../../generated/graphqlOperations";
import useNotification from "../../GlobalNotification/useNotification";

const useAppSettings = () => {
  const { showSuccessNotification } = useNotification();
  const appSettingsQuery = useAuthenticatedQuery<AppSettingsQuery, AppSettingsQueryVariables>(
    AppSettingsDocument,
  );

  const [setRegistrationEnabledMutation, setRegistrationEnabledResult] = useAuthenticatedMutation<
    SetRegistrationEnabledMutation,
    SetRegistrationEnabledMutationVariables
  >(SetRegistrationEnabledDocument, {
    refetchQueries: [AppSettingsDocument],
    onCompleted: () => {
      showSuccessNotification("App settings updated.");
    },
  });

  const setRegistrationEnabled = (enabled: boolean) =>
    setRegistrationEnabledMutation({ variables: { enabled } });

  return {
    appSettingsQuery,
    setRegistrationEnabled,
    setRegistrationEnabledResult,
  };
};

export default useAppSettings;
