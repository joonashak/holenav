import { Dialog, MenuItem, Paper, Select, SelectChangeEvent, Typography } from "@mui/material";
import { useState } from "react";
import SigTypes from "../../../../../enum/SigTypes";
import SigForm from "./SigForm";
import WormholeForm from "./WormholeForm";

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
  const [type, setType] = useState<SigTypes>(SigTypes.DATA.toUpperCase() as SigTypes);

  const onTypeChange = ({ target }: SelectChangeEvent) => {
    setType(target.value as SigTypes);
  };

  const showWormholeForm = type === SigTypes.WORMHOLE.toUpperCase();

  return (
    <Dialog open={open} onClose={onClose}>
      <Paper
        sx={{
          backgroundColor: "primary.dark",
          padding: "1rem",
        }}
      >
        <Typography variant="h2">New Signature</Typography>
        <Select value={type} onChange={onTypeChange} data-cy="select-sig-type">
          {typeOptions.map(({ key, value, label }) => (
            <MenuItem key={key} value={value} data-cy={`select-sig-type-option-${value}`}>
              {label}
            </MenuItem>
          ))}
        </Select>
        {showWormholeForm ? <WormholeForm /> : <SigForm type={type} />}
      </Paper>
    </Dialog>
  );
};
