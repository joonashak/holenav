import { useMutation } from "@apollo/client";
import { Button, Modal, Paper, Typography } from "@material-ui/core";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import ControlledTextField from "../../../../controls/ControlledTextField";
import { ADD_SIGNATURE } from "../../../SystemData/graphql";
import useSystemData from "../../../SystemData/useSystemData";

type SigModalProps = {
  open: boolean;
  onClose: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void;
};

export default ({ open, onClose }: SigModalProps) => {
  const { handleSubmit, control } = useForm();
  const { addSignature, id } = useSystemData();
  const [addSigMutation, { data, loading, error }] = useMutation(ADD_SIGNATURE);

  const onSubmit = (formData: any) => {
    try {
      addSigMutation({ variables: { ...formData, type: "RELIC", systemId: id } });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (data && !loading && !error) {
      addSignature(data.addSignature);
    }
  }, [data]);

  return (
    <Modal open={open} onClose={onClose}>
      <Paper>
        <Typography>New Signature</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ControlledTextField name="eveId" control={control} label="ID" />
          <ControlledTextField name="name" control={control} label="Name" />
          <Button type="submit" variant="contained" color="primary">
            Add
          </Button>
        </form>
      </Paper>
    </Modal>
  );
};
