import { Modal, Paper, Typography } from "@material-ui/core";

type SigModalProps = {
  open: boolean;
  onClose: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void;
};

export default ({ open, onClose }: SigModalProps) => {
  console.log("asd");

  return (
    <Modal open={open} onClose={onClose}>
      <Paper>
        <Typography>New Signature</Typography>
      </Paper>
    </Modal>
  );
};
