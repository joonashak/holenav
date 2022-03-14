import { Typography } from "@mui/material";
import PageTitle from "../../../common/PageTitle";
import Select from "../../../controls/Select";
import AddNewFolder from "./AddNewFolder";

const FolderManagement = () => {
  const folders = [
    { id: 1, value: 1, label: "Folder 1" },
    { id: 2, value: 2, label: "Folder 2" },
  ];

  return (
    <>
      <PageTitle>Folder Management</PageTitle>
      <AddNewFolder />
      <Typography>
        Select a folder to manage its properties and users&apos; access to it.
      </Typography>
      <Select options={folders} onChange={() => {}} title="Select Folder" value="" />
    </>
  );
};

export default FolderManagement;
