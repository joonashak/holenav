import useAuthenticatedMutation from "../../../auth/useAuthenticatedMutation";
import useAuthenticatedQuery from "../../../auth/useAuthenticatedQuery";
import {
  AppSettingsDocument,
  AppSettingsQuery,
  AppSettingsQueryVariables,
  SetCorporationFilterEnabledDocument,
  SetCorporationFilterEnabledMutation,
  SetCorporationFilterEnabledMutationVariables,
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

  const [setCorporationFilterEnabledMutation, setCorporationFilterEnabledResult] =
    useAuthenticatedMutation<
      SetCorporationFilterEnabledMutation,
      SetCorporationFilterEnabledMutationVariables
    >(SetCorporationFilterEnabledDocument, {
      refetchQueries: [AppSettingsDocument],
      onCompleted: () => {
        showSuccessNotification("App settings updated.");
      },
    });

  const setCorporationFilterEnabled = (enabled: boolean) =>
    setCorporationFilterEnabledMutation({ variables: { enabled } });

  return {
    appSettingsQuery,
    setRegistrationEnabled,
    setRegistrationEnabledResult,
    setCorporationFilterEnabled,
    setCorporationFilterEnabledResult,
  };
};

export default useAppSettings;
