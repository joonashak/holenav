import { useMutation } from "@apollo/client";
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
import { SubmitHandler, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CreateMapDocument,
  FindMap,
  FindMapsDocument,
} from "../../../../generated/graphqlOperations";
import ControlledTextField from "../../../controls/ControlledTextField";
import RhfAutocomplete from "../../../controls/RhfAutocomplete";

type Inputs = {
  name: string;
  rootSystemName: string;
};

type MapDialogProps = {
  edit?: boolean;
};

const MapDialog = ({ edit = false }: MapDialogProps) => {
  const navigate = useNavigate();
  const loc = useLocation();
  const map = edit ? (loc.state.map as FindMap) : undefined;

  const [createMap] = useMutation(CreateMapDocument, {
    refetchQueries: [FindMapsDocument],
  });

  const { handleSubmit, control } = useForm({
    defaultValues: {
      name: map?.name || "",
      rootSystemName: map?.rootSystemName || "",
    },
  });

  const closeDialog = () => navigate("..");

  const onSubmit: SubmitHandler<Inputs> = async (map) => {
    await createMap({ variables: { map } });
    closeDialog();
  };

  return (
    <Dialog open onClose={closeDialog}>
      <DialogTitle>{edit ? "Edit Map" : "Create New Map"}</DialogTitle>
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
        <Button color="secondary" variant="outlined" onClick={closeDialog}>
          Cancel
        </Button>
        <Button
          type="submit"
          color="secondary"
          variant="contained"
          onClick={handleSubmit(onSubmit)}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MapDialog;
