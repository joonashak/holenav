import systems from "@eve-data/systems";
import { Button, DialogContent, DialogProps, DialogTitle } from "@mui/material";
import { useForm } from "react-hook-form";
import Dialog from "../../../common/Dialog";
import ControlledTextField from "../../../controls/ControlledTextField";
import FormGroupRow from "../../../controls/FormGroupRow";
import RhfAutocomplete from "../../../controls/RhfAutocomplete";
import useSystemData from "../../SystemData/useSystemData";

const SaveMapDialog = ({ open, onClose }: DialogProps) => {
  const { name: systemName } = useSystemData();
  const { handleSubmit, control } = useForm({ defaultValues: { rootSystemName: systemName } });

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Save Map</DialogTitle>
      <DialogContent>
        <form>
          <FormGroupRow>
            <ControlledTextField name="name" control={control} label="Name" />
            <RhfAutocomplete
              name="rootSystemName"
              control={control}
              options={systems.map((system) => system.name)}
            />
          </FormGroupRow>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            data-cy="save-map-form-submit"
            fullWidth
          >
            Save Map
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SaveMapDialog;
