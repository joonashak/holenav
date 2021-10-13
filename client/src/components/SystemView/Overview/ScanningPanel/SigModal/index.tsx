import { Dialog, makeStyles, MenuItem, Paper, Select, Theme, Typography } from "@material-ui/core";
import { ChangeEvent, useState } from "react";
import SigTypes from "../../../../../enum/SigTypes";
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
  const [type, setType] = useState<SigTypes>(SigTypes.DATA.toUpperCase() as SigTypes);

  const onTypeChange = ({ target }: ChangeEvent<{ value: unknown }>) => {
    setType(target.value as SigTypes);
  };

  const showWormholeForm = type === SigTypes.WORMHOLE.toUpperCase();

  return (
    <Dialog open={open} onClose={onClose}>
      <Paper className={classes.paper}>
        <Typography variant="h2" className={classes.h2}>
          New Signature
        </Typography>
        <Select value={type} onChange={onTypeChange}>
          {typeOptions.map(({ key, value, label }) => (
            <MenuItem key={key} value={value}>
              {label}
            </MenuItem>
          ))}
        </Select>
        {showWormholeForm ? <WormholeForm /> : <SigForm type={type} />}
      </Paper>
    </Dialog>
  );
};
