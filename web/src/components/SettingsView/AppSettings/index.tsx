import SettingsGrid from "../SettingsGrid";
import RegistrationSettings from "./RegistrationSettings";
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
