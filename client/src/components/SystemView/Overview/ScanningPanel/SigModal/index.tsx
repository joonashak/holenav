import { useMutation } from "@apollo/client";
import {
  Button,
  Dialog,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  Theme,
  Typography,
} from "@material-ui/core";
import { ChangeEvent, useEffect, useState } from "react";
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
  const [type, setType] = useState<SigTypes>(SigTypes.DATA.toUpperCase() as SigTypes);

  const onTypeChange = ({ target }: ChangeEvent<{ value: unknown }>) => {
    setType(target.value as SigTypes);
  };

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
        <SigForm type={type} />
      </Paper>
    </Dialog>
  );
};
