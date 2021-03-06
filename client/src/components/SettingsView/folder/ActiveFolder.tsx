import { SelectChangeEvent } from "@mui/material";
import PageTitle from "../../common/PageTitle";
import Select from "../../controls/Select";
import useUserSettings from "../../UserData/settings/useUserSettings";
import useSettingsData from "../SettingsData/useSettingsData";

const ActiveFolder = () => {
  const { activeFolder, setActiveFolder } = useUserSettings();
  const { accessibleFolders } = useSettingsData();

  const options = accessibleFolders.map(({ id, name }) => ({ id, value: id, label: name }));

  const onChange = (event: SelectChangeEvent<string>) => {
    const newActiveFolder = accessibleFolders.find((folder) => folder.id === event.target.value);
    if (newActiveFolder) {
      setActiveFolder(newActiveFolder);
    }
  };

  return (
    <>
      <PageTitle>Active Folder</PageTitle>
      <Select options={options} onChange={onChange} value={activeFolder.id} title="Active Folder" />
    </>
  );
};

export default ActiveFolder;
