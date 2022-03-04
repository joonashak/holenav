import PageTitle from "../../common/PageTitle";
import Select from "../../controls/Select";
import useUserData from "../../UserData/useUserData";
import useSettingsData from "../SettingsData/useSettingsData";

const ActiveFolder = () => {
  const { activeFolder } = useUserData();
  const { accessibleFolders } = useSettingsData();

  const options = accessibleFolders.map(({ id, name }) => ({ id, value: id, label: name }));
  const onChange = () => {};

  return (
    <>
      <PageTitle>Active Folder</PageTitle>
      <Select options={options} onChange={onChange} value={activeFolder} title="Active Folder" />
    </>
  );
};

export default ActiveFolder;
