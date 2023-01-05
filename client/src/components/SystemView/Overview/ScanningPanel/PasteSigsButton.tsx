import { Button, ButtonProps } from "@mui/material";
import ContentPasteGoIcon from "@mui/icons-material/ContentPasteGo";
import SyncIcon from "@mui/icons-material/Sync";

type PasteSigsButtonProps = {
  sync?: boolean;
  sx?: ButtonProps["sx"];
};

const PasteSigsButton = ({ sync, sx }: PasteSigsButtonProps) => {
  console.log("asd");

  return (
    <>
      <Button
        variant="outlined"
        color="secondary"
        data-cy="add-sig-button"
        fullWidth
        startIcon={!sync && <ContentPasteGoIcon />}
        endIcon={sync && <SyncIcon />}
        sx={{ mt: 1.5, ...sx }}
      >
        {sync ? "Sync Signatures from Clipboard" : "Update Signatures from Clipboard"}
      </Button>
    </>
  );
};

PasteSigsButton.defaultProps = {
  sync: false,
  sx: {},
};

export default PasteSigsButton;
