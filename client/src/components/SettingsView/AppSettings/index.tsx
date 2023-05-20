import PageTitle from "../../common/PageTitle";
import AppSettingsData from "./AppSettingsData";
import RegistrationSettings from "./RegistrationSettings";

const AppSettings = () => {
  return (
    <AppSettingsData>
      <PageTitle>App Settings</PageTitle>
      <RegistrationSettings />
    </AppSettingsData>
  );
};

export default AppSettings;
