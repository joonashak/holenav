import { useQuery } from "@apollo/client";
import { Button } from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import useAuthenticatedMutation from "../../../auth/useAuthenticatedMutation";
import { GetPublicAppDataDocument, UpdateMotdDocument } from "../../../generated/graphqlOperations";
import ControlledTextField from "../../controls/ControlledTextField";
import FormGroupRow from "../../controls/FormGroupRow";
import useNotification from "../../GlobalNotification/useNotification";

const MotdEditor = () => {
  const { showSuccessNotification } = useNotification();
  const { data } = useQuery(GetPublicAppDataDocument);
  const { handleSubmit, control } = useForm({
    defaultValues: {
      motd: data?.getPublicAppData.motd || "",
    },
  });

  const [updateMotd] = useAuthenticatedMutation(UpdateMotdDocument, {
    onCompleted: () => {
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
