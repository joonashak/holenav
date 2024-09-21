import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const MapDialog = () => {
  const navigate = useNavigate();

  return (
    <Dialog open onClose={() => navigate(-1)}>
      <DialogTitle>Create New Map</DialogTitle>
      <DialogContent>
        <Typography>
          Saved maps allow you to quickly switch between mapper views. The
          mapper shows wormhole chains originating from the selected map's root
          system.
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

export default MapDialog;
