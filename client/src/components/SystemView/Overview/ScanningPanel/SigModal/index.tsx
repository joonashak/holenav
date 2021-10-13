import { useMutation } from "@apollo/client";
import { Button, Dialog, makeStyles, Paper, Theme, Typography } from "@material-ui/core";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import SigTypes from "../../../../../enum/SigTypes";
import ControlledSelect from "../../../../controls/ControlledSelect";
import useNotification from "../../../../GlobalNotification/useNotification";
import { ADD_SIGNATURE } from "../../../SystemData/graphql";
import useSystemData from "../../../SystemData/useSystemData";
import SigForm from "./SigForm";
import WormholeForm from "./WormholeForm";

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    backgroundColor: theme.palette.primary.main,
    padding: "1rem",
  },
  h2: {
    color: theme.palette.secondary.main,
  },
}));

const typeOptions = Object.entries(SigTypes).map(([key, label]) => ({
  key: `sig-type-${key}`,
  value: key,
  label,
}));

type SigModalProps = {
  open: boolean;
  onClose: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void;
};

export default ({ open, onClose }: SigModalProps) => {
  const classes = useStyles();
  const { handleSubmit, control, watch } = useForm({
    defaultValues: {
      type: typeOptions[2].value,
      life: "lt-24-hrs",
      mass: "stable",
      whType: "K162",
    },
  });
  const type = watch("type");
  const whSelected = type === SigTypes.WORMHOLE.toUpperCase();
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
    <Dialog open={open} onClose={onClose}>
      <Paper className={classes.paper}>
        <Typography variant="h2" className={classes.h2}>
          New Signature
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ControlledSelect name="type" control={control} label="Type" options={typeOptions} />
          {whSelected ? <WormholeForm control={control} /> : <SigForm control={control} />}
          <Button type="submit" variant="contained" color="primary">
            Add
          </Button>
        </form>
      </Paper>
    </Dialog>
  );
};
