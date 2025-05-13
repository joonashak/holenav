import { useMutation, useQuery } from "@apollo/client";
import { Button, Typography } from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import {
  GetPublicAppDataDocument,
  UpdateMotdDocument,
} from "../../../generated/graphql-operations";
import ControlledTextField from "../../controls/ControlledTextField";
import FormGroupRow from "../../controls/FormGroupRow";
import useNotification from "../../global-notification/useNotification";

const MotdEditor = () => {
  const { data } = useQuery(GetPublicAppDataDocument);
  const { showSuccessNotification } = useNotification();
  const { handleSubmit, control } = useForm({
    defaultValues: {
      // FIXME: This might not work but I didn't wanna spend time on it now. The whole editor thing is not in use right now.
      motd: data?.getPublicAppData.motd || "",
    },
  });

  const [updateMotd] = useMutation(UpdateMotdDocument, {
    onCompleted: () => {
      showSuccessNotification("MOTD updated.");
    },
    refetchQueries: [GetPublicAppDataDocument],
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
