import { DialogProps, DialogTitle } from "@mui/material";
import Dialog from "../../../common/Dialog";

const SaveMapDialog = ({ open, onClose }: DialogProps) => {
  console.log("asd");

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Save Map</DialogTitle>
    </Dialog>
  );
};

export default SaveMapDialog;
