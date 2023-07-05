import PageTitle from "../../common/PageTitle";
import RegistrationSettings from "./RegistrationSettings";
import useAppSettings from "./useAppSettings";

const AppSettings = () => {
  const { appSettingsQuery } = useAppSettings();
  const { loading } = appSettingsQuery;

  return (
    <>
      <PageTitle>App Settings</PageTitle>
      {!loading && <RegistrationSettings />}
    </>
  );
};

export default AppSettings;
