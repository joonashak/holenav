import SettingsGrid from "../settings-grid/SettingsGrid";
import RegistrationSettings from "./registration-settings/RegistrationSettings";
import useAppSettings from "./useAppSettings";

const AppSettings = () => {
  const { appSettingsQuery } = useAppSettings();
  const { loading } = appSettingsQuery;

  return (
    <SettingsGrid title="App Settings">
      {!loading && <RegistrationSettings />}
    </SettingsGrid>
  );
};

export default AppSettings;
