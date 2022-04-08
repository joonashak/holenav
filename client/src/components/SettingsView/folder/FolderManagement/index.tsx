import { Typography } from "@mui/material";
import PageTitle from "../../../common/PageTitle";
import Select from "../../../controls/Select";
import useSettingsData from "../../SettingsData/useSettingsData";
import AddNewFolder from "./AddNewFolder";

const FolderManagement = () => {
  const { manageableFolders } = useSettingsData();

  const folderOptions = manageableFolders.map(({ id, name }) => ({ id, value: id, label: name }));

  return (
    <>
      <PageTitle>Folder Management</PageTitle>
      <AddNewFolder />
      <Typography>
        Select a folder to manage its properties and users&apos; access to it.
      </Typography>
      <Select options={folderOptions} onChange={() => {}} title="Select Folder" value="" />
    </>
  );
};

export default FolderManagement;
