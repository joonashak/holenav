import { useState } from "@hookstate/core";
import { Button } from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import { motdState } from ".";
import useAuthenticatedMutation from "../../../auth/useAuthenticatedMutation";
import { UpdateMotdDocument } from "../../../generated/graphqlOperations";
import ControlledTextField from "../../controls/ControlledTextField";
import FormGroupRow from "../../controls/FormGroupRow";
import useNotification from "../../GlobalNotification/useNotification";

const MotdEditor = () => {
  const state = useState(motdState);
  const { showSuccessNotification } = useNotification();
  const { handleSubmit, control } = useForm({
    defaultValues: {
      motd: state.value,
    },
  });

  const [updateMotd] = useAuthenticatedMutation(UpdateMotdDocument, {
    onCompleted: (data) => {
      state.set(data.updateMotd.motd);
      showSuccessNotification("MOTD updated.");
    },
  });

  const onSubmit = ({ motd }: FieldValues) => {
    updateMotd({ variables: { motd } });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormGroupRow>
        <ControlledTextField name="motd" control={control} label="MOTD" />
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          data-cy="motd-form-submit"
          fullWidth
        >
          Update MOTD
        </Button>
      </FormGroupRow>
    </form>
  );
};

export default MotdEditor;
