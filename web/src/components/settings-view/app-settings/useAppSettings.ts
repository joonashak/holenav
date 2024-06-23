import { useMutation, useQuery } from "@apollo/client";
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
  RemoveAllowedAllianceDocument,
  RemoveAllowedAllianceMutation,
  RemoveAllowedAllianceMutationVariables,
  RemoveAllowedCorporationDocument,
  RemoveAllowedCorporationMutation,
  RemoveAllowedCorporationMutationVariables,
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
import useNotification from "../../global-notification/useNotification";

const useAppSettings = () => {
  const { showSuccessNotification } = useNotification();
  const refetchQueries = [AppSettingsDocument];

  const appSettingsQuery = useQuery<
    AppSettingsQuery,
    AppSettingsQueryVariables
  >(AppSettingsDocument);

  const [setRegistrationEnabledMutation, setRegistrationEnabledResult] =
    useMutation<
      SetRegistrationEnabledMutation,
      SetRegistrationEnabledMutationVariables
    >(SetRegistrationEnabledDocument, {
      refetchQueries,
      onCompleted: () => {
        showSuccessNotification("App settings updated.");
      },
    });

  const setRegistrationEnabled = (enabled: boolean) =>
    setRegistrationEnabledMutation({ variables: { enabled } });

  const [
    setCorporationFilterEnabledMutation,
    setCorporationFilterEnabledResult,
  ] = useMutation<
    SetCorporationFilterEnabledMutation,
    SetCorporationFilterEnabledMutationVariables
  >(SetCorporationFilterEnabledDocument, {
    refetchQueries,
    onCompleted: () => {
      showSuccessNotification("App settings updated.");
    },
  });

  const setCorporationFilterEnabled = (enabled: boolean) =>
    setCorporationFilterEnabledMutation({ variables: { enabled } });

  const [setAllianceFilterEnabledMutation, setAllianceFilterEnabledResult] =
    useMutation<
      SetAllianceFilterEnabledMutation,
      SetAllianceFilterEnabledMutationVariables
    >(SetAllianceFilterEnabledDocument, {
      refetchQueries,
      onCompleted: () => {
        showSuccessNotification("App settings updated.");
      },
    });

  const setAllianceFilterEnabled = (enabled: boolean) =>
    setAllianceFilterEnabledMutation({ variables: { enabled } });

  const [addAllowedCorporationMutation, addAllowedCorporationResult] =
    useMutation<
      AddAllowedCorporationMutation,
      AddAllowedCorporationMutationVariables
    >(AddAllowedCorporationDocument, {
      refetchQueries,
      onCompleted: () => {
        showSuccessNotification("Corporation added to allowlist.");
      },
    });

  const addAllowedCorporation = (esiId: string) =>
    addAllowedCorporationMutation({ variables: { esiId } });

  const [addAllowedAllianceMutation, addAllowedAllianceResult] = useMutation<
    AddAllowedAllianceMutation,
    AddAllowedAllianceMutationVariables
  >(AddAllowedAllianceDocument, {
    refetchQueries,
    onCompleted: () => {
      showSuccessNotification("Alliance added to allowlist.");
    },
  });

  const addAllowedAlliance = (esiId: string) =>
    addAllowedAllianceMutation({ variables: { esiId } });

  const [removeAllowedCorporationMutation, removeAllowedCorporationResult] =
    useMutation<
      RemoveAllowedCorporationMutation,
      RemoveAllowedCorporationMutationVariables
    >(RemoveAllowedCorporationDocument, {
      refetchQueries,
      onCompleted: () => {
        showSuccessNotification("Corporation removed from allowlist.");
      },
    });

  const removeAllowedCorporation = (esiId: string) =>
    removeAllowedCorporationMutation({ variables: { esiId } });

  const [removeAllowedAllianceMutation, removeAllowedAllianceResult] =
    useMutation<
      RemoveAllowedAllianceMutation,
      RemoveAllowedAllianceMutationVariables
    >(RemoveAllowedAllianceDocument, {
      refetchQueries,
      onCompleted: () => {
        showSuccessNotification("Alliance removed from allowlist.");
      },
    });

  const removeAllowedAlliance = (esiId: string) =>
    removeAllowedAllianceMutation({ variables: { esiId } });

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
    removeAllowedCorporation,
    removeAllowedCorporationResult,
    removeAllowedAlliance,
    removeAllowedAllianceResult,
  };
};

export default useAppSettings;
