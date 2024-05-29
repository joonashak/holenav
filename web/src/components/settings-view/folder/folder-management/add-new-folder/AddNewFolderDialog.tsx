import { Box, Button, FormGroup } from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import ControlledTextField from "../../../../controls/ControlledTextField";
import useSettingsData from "../../../useSettingsData";

const AddNewFolderDialog = () => {
  const { handleSubmit, control } = useForm();
  const { createFolder } = useSettingsData();

  const submit = async ({ name }: FieldValues) => {
    await createFolder(name);
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "stretch", md: "center" },
          mb: 3,
        }}
      >
        <FormGroup sx={{ flexGrow: 1, mr: { xs: 0, md: 2 } }}>
          <ControlledTextField
            name="name"
            control={control}
            label="New Folder Name"
            rules={{ required: "Folder must have a name." }}
          />
        </FormGroup>
        <FormGroup>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            size="large"
            data-cy="add-new-folder-button"
          >
            Add New Folder
          </Button>
        </FormGroup>
      </Box>
    </form>
  );
};

export default AddNewFolderDialog;
