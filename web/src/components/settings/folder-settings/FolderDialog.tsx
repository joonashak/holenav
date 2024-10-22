import { useMutation } from "@apollo/client";
import { Box, Button, FormGroup } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  CreateFolderDocument,
  FindAccessibleFoldersDocument,
} from "../../../generated/graphqlOperations";
import ControlledTextField from "../../controls/ControlledTextField";
import SettingsDialog from "../SettingsDialog";

const FolderDialog = () => {
  const navigate = useNavigate();
  const [createFolder] = useMutation(CreateFolderDocument, {
    refetchQueries: [FindAccessibleFoldersDocument],
  });

  const { handleSubmit, control } = useForm({
    defaultValues: {
      name: "",
    },
  });

  const onSubmit: SubmitHandler<{ name: string }> = async ({ name }) => {
    await createFolder({ variables: { name } });
    navigate("../folder-options");
  };

  return (
    <SettingsDialog title="Create Folder">
      <form>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
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
                required: { value: true, message: "Folder needs a name." },
              }}
            />
          </FormGroup>
          <Button
            type="submit"
            color="secondary"
            variant="contained"
            onClick={handleSubmit(onSubmit)}
          >
            Create
          </Button>
        </Box>
      </form>
    </SettingsDialog>
  );
};

export default FolderDialog;
