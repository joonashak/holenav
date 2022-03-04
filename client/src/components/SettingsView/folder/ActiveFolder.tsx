import PageTitle from "../../common/PageTitle";
import useUserData from "../../UserData/useUserData";
import useSettingsData from "../SettingsData/useSettingsData";

const ActiveFolder = () => {
  const { activeFolder } = useUserData();
  const { accessibleFolders } = useSettingsData();
  console.log(accessibleFolders);

  return (
    <>
      <PageTitle>Active Folder</PageTitle>
      {activeFolder}
    </>
  );
};

export default ActiveFolder;
