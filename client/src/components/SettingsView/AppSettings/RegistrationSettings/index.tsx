import { Box, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { ChangeEvent } from "react";
import useAuthenticatedMutation from "../../../../auth/useAuthenticatedMutation";
import useAuthenticatedQuery from "../../../../auth/useAuthenticatedQuery";
import {
  AppSettingsDocument,
  AppSettingsQuery,
  AppSettingsQueryVariables,
  SetRegistrationEnabledDocument,
  SetRegistrationEnabledMutation,
  SetRegistrationEnabledMutationVariables,
} from "../../../../generated/graphqlOperations";

const RegistrationSettings = () => {
  const { data, loading } = useAuthenticatedQuery<AppSettingsQuery, AppSettingsQueryVariables>(
    AppSettingsDocument,
  );

  const [setEnabled] = useAuthenticatedMutation<
    SetRegistrationEnabledMutation,
    SetRegistrationEnabledMutationVariables
  >(SetRegistrationEnabledDocument, { refetchQueries: [AppSettingsDocument] });

  const toggle = async (_: ChangeEvent, checked: boolean) => {
    await setEnabled({ variables: { enabled: checked } });
  };

  if (loading) {
    return null;
  }

  return (
    <Box>
      <FormGroup>
        <FormControlLabel
          label="New User Registration Enabled"
          control={
            <Checkbox
              color="secondary"
              checked={data?.getAppData.settings.registration.enabled}
              onChange={toggle}
            />
          }
        />
      </FormGroup>
    </Box>
  );
};

export default RegistrationSettings;
