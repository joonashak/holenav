import Select from "../../../../controls/Select";
import useSettingsData from "../../../SettingsData/useSettingsData";
import CharacterSearch from "./CharacterSearch";

const ManageFolder = () => {
  const { manageableFolders } = useSettingsData();

  const folderOptions = manageableFolders.map(({ id, name }) => ({ id, value: id, label: name }));

  return (
    <>
      <Select options={folderOptions} onChange={() => {}} title="Select Folder" value="" />
      <CharacterSearch />
    </>
  );
};

export default ManageFolder;
