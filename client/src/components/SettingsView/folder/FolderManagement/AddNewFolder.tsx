import { Box, Button, FormGroup } from "@mui/material";
import { useForm } from "react-hook-form";
import ControlledTextField from "../../../controls/ControlledTextField";

const AddNewFolder = () => {
  const { handleSubmit, control } = useForm();

  return (
    <form onSubmit={handleSubmit(() => {})}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "stretch", md: "center" },
          mb: 3,
        }}
      >
        <FormGroup sx={{ flexGrow: 1, mr: { xs: 0, md: 2 } }}>
          <ControlledTextField name="name" control={control} label="New Folder Name" />
        </FormGroup>
        <FormGroup>
          <Button type="submit" variant="contained" color="secondary" size="large">
            Add New Folder
          </Button>
        </FormGroup>
      </Box>
    </form>
  );
};

export default AddNewFolder;
