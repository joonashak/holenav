import systems from "@eve-data/systems";
import { Button, DialogContent, DialogProps, DialogTitle } from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import { SavedMap } from "../../../../generated/graphqlOperations";
import useNotification from "../../../GlobalNotification/useNotification";
import useUserData from "../../../UserData/useUserData";
import Dialog from "../../../common/Dialog";
import ControlledTextField from "../../../controls/ControlledTextField";
import FormGroupRow from "../../../controls/FormGroupRow";
import RhfAutocomplete from "../../../controls/RhfAutocomplete";
import useSystemData from "../../SystemData/useSystemData";

type SaveMapDialogProps = DialogProps & {
  onClose: () => void;
};

const SaveMapDialog = ({ open, onClose }: SaveMapDialogProps) => {
  const { showSuccessNotification } = useNotification();
  const { addSavedMap } = useUserData();
  const { name: systemName } = useSystemData();
  const { handleSubmit, control } = useForm({ defaultValues: { rootSystemName: systemName } });

  const submit = async (formData: FieldValues) => {
    const res = await addSavedMap(formData as SavedMap);

    if (res.data && !res.errors) {
      showSuccessNotification("Map saved.");
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Save Map</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(submit)}>
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
