import { Button, FormGroup } from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import ControlledTextField from "../../components/controls/ControlledTextField";
import useLocalData from "../../components/LocalData/useLocalData";

const DevKeyForm = () => {
  const { handleSubmit, control } = useForm();
  const { setDevKey } = useLocalData();

  const submit = async ({ devKey }: FieldValues) => {
    await setDevKey(devKey);
    console.log("Dev key saved.");
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <FormGroup>
        <ControlledTextField
          name="devKey"
          control={control}
          label="Dev Key"
          color="secondary"
          variant="standard"
        />
      </FormGroup>
      <FormGroup>
        <Button type="submit" variant="contained" color="primary">
          Save
        </Button>
      </FormGroup>
    </form>
  );
};

export default DevKeyForm;
