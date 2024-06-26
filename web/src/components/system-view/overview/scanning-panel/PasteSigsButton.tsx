import ContentPasteGoIcon from "@mui/icons-material/ContentPasteGo";
import SyncIcon from "@mui/icons-material/Sync";
import { Button, ButtonProps } from "@mui/material";
import useSigPasteListener from "./sig-paste-listener/useSigPasteListener";

type PasteSigsButtonProps = {
  sync?: boolean;
  sx?: ButtonProps["sx"];
};

const PasteSigsButton = ({ sync = false, sx }: PasteSigsButtonProps) => {
  const { updateSigsFromClipboard } = useSigPasteListener();

  const onClick = async () => updateSigsFromClipboard(sync);

  return (
    <>
      <Button
        onClick={onClick}
        variant="outlined"
        color={sync ? "info" : "secondary"}
        data-cy={sync ? "sync-sigs-button" : "update-sigs-button"}
        fullWidth
        startIcon={!sync && <ContentPasteGoIcon />}
        endIcon={sync && <SyncIcon />}
        sx={{ mt: 1.5, ...sx }}
      >
        {sync
          ? "Sync Signatures from Clipboard"
          : "Update Signatures from Clipboard"}
      </Button>
    </>
  );
};

export default PasteSigsButton;
