import { useMutation } from "@apollo/client";
import { Button } from "@material-ui/core";
import { useEffect } from "react";
import { Control, useForm } from "react-hook-form";
import SigTypes from "../../../../../enum/SigTypes";
import ControlledSelect from "../../../../controls/ControlledSelect";
import ControlledTextField from "../../../../controls/ControlledTextField";
import useNotification from "../../../../GlobalNotification/useNotification";
import { ADD_SIGNATURE } from "../../../SystemData/graphql";
import useSystemData from "../../../SystemData/useSystemData";

const typeOptions = Object.entries(SigTypes).map(([key, label]) => ({
  key: `sig-type-${key}`,
  value: key,
  label,
}));

type SigFormProps = {
  control: Control<any, object>;
};

export default () => {
  const { handleSubmit, control } = useForm({ defaultValues: { type: typeOptions[0].value } });
  const { addSignature, id } = useSystemData();
  const [addSigMutation, { data, loading, error }] = useMutation(ADD_SIGNATURE);
  const { setNotification } = useNotification();

  const onSubmit = (formData: any) => {
    addSigMutation({ variables: { ...formData, systemId: id } });
  };

  useEffect(() => {
    if (data && !loading && !error) {
      addSignature(data.addSignature);
      setNotification("Signature added.", "success", true);
    }
  }, [data, loading, error]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ControlledSelect name="type" control={control} label="Type" options={typeOptions} />

      <ControlledTextField name="eveId" control={control} label="ID" />
      <ControlledTextField name="name" control={control} label="Name" />
      <Button type="submit" variant="contained" color="primary">
        Add
      </Button>
    </form>
  );
};
