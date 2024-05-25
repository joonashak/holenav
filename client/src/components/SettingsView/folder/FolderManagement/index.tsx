import { Typography } from "@mui/material";
import PageTitle from "../../../common/PageTitle";
import AddNewFolder from "./AddNewFolder";
import ManageFolder from "./ManageFolder";

const FolderManagement = () => (
  <>
    <PageTitle>Folder Management</PageTitle>
    <AddNewFolder />
    <Typography>
      Select a folder to manage its properties and users&apos; access to it.
    </Typography>
    <ManageFolder />
  </>
);

export default FolderManagement;
