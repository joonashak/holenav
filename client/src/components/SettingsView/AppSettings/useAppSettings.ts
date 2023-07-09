import useAuthenticatedMutation from "../../../auth/useAuthenticatedMutation";
import useAuthenticatedQuery from "../../../auth/useAuthenticatedQuery";
import {
  AddAllowedAllianceDocument,
  AddAllowedAllianceMutation,
  AddAllowedAllianceMutationVariables,
  AddAllowedCorporationDocument,
  AddAllowedCorporationMutation,
  AddAllowedCorporationMutationVariables,
  AppSettingsDocument,
  AppSettingsQuery,
  AppSettingsQueryVariables,
  SetAllianceFilterEnabledDocument,
  SetAllianceFilterEnabledMutation,
  SetAllianceFilterEnabledMutationVariables,
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

  const [setAllianceFilterEnabledMutation, setAllianceFilterEnabledResult] =
    useAuthenticatedMutation<
      SetAllianceFilterEnabledMutation,
      SetAllianceFilterEnabledMutationVariables
    >(SetAllianceFilterEnabledDocument, {
      refetchQueries: [AppSettingsDocument],
      onCompleted: () => {
        showSuccessNotification("App settings updated.");
      },
    });

  const setAllianceFilterEnabled = (enabled: boolean) =>
    setAllianceFilterEnabledMutation({ variables: { enabled } });

  const [addAllowedCorporationMutation, addAllowedCorporationResult] = useAuthenticatedMutation<
    AddAllowedCorporationMutation,
    AddAllowedCorporationMutationVariables
  >(AddAllowedCorporationDocument, {
    refetchQueries: [AppSettingsDocument],
    onCompleted: () => {
      showSuccessNotification("Corporation added to allowlist.");
    },
  });

  const addAllowedCorporation = (esiId: string) =>
    addAllowedCorporationMutation({ variables: { esiId } });

  const [addAllowedAllianceMutation, addAllowedAllianceResult] = useAuthenticatedMutation<
    AddAllowedAllianceMutation,
    AddAllowedAllianceMutationVariables
  >(AddAllowedAllianceDocument, {
    refetchQueries: [AppSettingsDocument],
    onCompleted: () => {
      showSuccessNotification("Alliance added to allowlist.");
    },
  });

  const addAllowedAlliance = (esiId: string) =>
    addAllowedAllianceMutation({ variables: { esiId } });

  return {
    appSettingsQuery,
    setRegistrationEnabled,
    setRegistrationEnabledResult,
    setCorporationFilterEnabled,
    setCorporationFilterEnabledResult,
    setAllianceFilterEnabled,
    setAllianceFilterEnabledResult,
    addAllowedCorporation,
    addAllowedCorporationResult,
    addAllowedAlliance,
    addAllowedAllianceResult,
  };
};

export default useAppSettings;
