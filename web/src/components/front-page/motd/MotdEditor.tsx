import { useState } from "@hookstate/core";
import { Button, Typography } from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import useAuthenticatedMutation from "../../../auth/useAuthenticatedMutation";
import { UpdateMotdDocument } from "../../../generated/graphqlOperations";
import ControlledTextField from "../../controls/ControlledTextField";
import FormGroupRow from "../../controls/FormGroupRow";
import useNotification from "../../global-notification/useNotification";
import { motdState } from "./Motd";

const MotdEditor = () => {
  const state = useState(motdState);
  const { showSuccessNotification } = useNotification();
  const { handleSubmit, control } = useForm({
    defaultValues: {
      motd: state.value,
    },
  });

  const [updateMotd] = useAuthenticatedMutation(UpdateMotdDocument, {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onCompleted: (data: any) => {
      state.set(data.updateMotd.motd);
      showSuccessNotification("MOTD updated.");
    },
  });

  const onSubmit = ({ motd }: FieldValues) => {
    updateMotd({ variables: { motd } });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormGroupRow fullWidth>
        <ControlledTextField
          name="motd"
          control={control}
          label="MOTD"
          multiline
          minRows={3}
        />
      </FormGroupRow>
      <FormGroupRow>
        <Typography sx={{ color: "secondary.light", fontStyle: "italic" }}>
          MOTD is public. You can use Markdown.
        </Typography>
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
