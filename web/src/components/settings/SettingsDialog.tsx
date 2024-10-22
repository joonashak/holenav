import { Dialog, DialogContent, DialogProps, DialogTitle } from "@mui/material";
import { useNavigate } from "react-router-dom";

type SettingsDialogProps = Omit<DialogProps, "open"> & {
  title: string;
};

const SettingsDialog = ({ title, children, ...props }: SettingsDialogProps) => {
  const navigate = useNavigate();
  const closeDialog = () => navigate("..");

  return (
    <Dialog {...props} open onClose={closeDialog}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
