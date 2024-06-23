import { SelectChangeEvent } from "@mui/material";
import PageTitle from "../../common/PageTitle";
import Select from "../../controls/select/Select";
import useSettingsData from "../useSettingsData";

// FIXME: This will probably be rewritten, so functionality is just disabled for now.

const ActiveFolder = () => {
  const { accessibleFolders } = useSettingsData();

  const options = accessibleFolders.map(({ id, name }) => ({
    id,
    value: id,
    label: name,
  }));

  const onChange = (event: SelectChangeEvent<string>) => {
    const newActiveFolder = accessibleFolders.find(
      (folder) => folder.id === event.target.value,
    );
    if (newActiveFolder) {
      // setActiveFolder(newActiveFolder);
    }
  };

  return (
    <>
      <PageTitle>Active Folder</PageTitle>
      <Select
        options={options}
        onChange={onChange}
        value={""}
        title="Active Folder"
      />
    </>
  );
};

export default ActiveFolder;
