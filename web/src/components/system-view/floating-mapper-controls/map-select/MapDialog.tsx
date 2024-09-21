import systems from "@eve-data/systems";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormGroup,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ControlledTextField from "../../../controls/ControlledTextField";
import RhfAutocomplete from "../../../controls/RhfAutocomplete";

const MapDialog = () => {
  const navigate = useNavigate();

  const { handleSubmit, control } = useForm({
    defaultValues: {
      name: "",
      rootSystemName: "",
    },
  });

  const onClose = () => navigate(-1);

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>Create New Map</DialogTitle>
      <DialogContent>
        <DialogContentText color="secondary.light">
          Saved maps allow you to quickly switch between mapper views. The
          mapper shows wormhole chains originating from the selected map's root
          system.
        </DialogContentText>
        <form>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              mt: 4,
              ml: "auto",
              mr: "auto",
              width: "20rem",
            }}
          >
            <FormGroup>
              <ControlledTextField
                name="name"
                control={control}
                label="Name"
                rules={{
                  required: { value: true, message: "Map needs a name." },
                }}
              />
            </FormGroup>
            <FormGroup>
              <RhfAutocomplete
                name="rootSystemName"
                control={control}
                label="Root System"
                options={systems.map((system) => system.name)}
                rules={{
                  required: {
                    value: true,
                    message: "Select a starting system for your map.",
                  },
                }}
              />
            </FormGroup>
          </Box>
        </form>
      </DialogContent>
      <DialogActions sx={{ mt: 2 }}>
        <Button color="secondary" variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button
          type="submit"
          color="secondary"
          variant="contained"
          onClick={handleSubmit(() => {})}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MapDialog;
