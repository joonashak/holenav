import { Dialog, DialogContent, DialogTitle, SelectChangeEvent, TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";
import Select from "../../../../controls/Select";
import SigTypes from "../../../../../enum/SigTypes";
import SigForm from "./SigForm";
import WormholeForm from "./WormholeForm";
import FormGroupRow from "../../../../controls/FormGroupRow";

const typeOptions = Object.entries(SigTypes).map(([key, label]) => ({
  id: `sig-type-${key}`,
  value: key,
  label,
}));

type SigModalProps = {
  open: boolean;
  onClose: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void;
};

export default ({ open, onClose }: SigModalProps) => {
  const [type, setType] = useState<SigTypes>(SigTypes.WORMHOLE.toUpperCase() as SigTypes);
  const [eveId, setEveId] = useState<string>("");

  const onTypeChange = ({ target }: SelectChangeEvent) => {
    setType(target.value as SigTypes);
  };

  const onEveIdChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setEveId(target.value);
  };

  const showWormholeForm = type === SigTypes.WORMHOLE.toUpperCase();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: "100vw",
          ml: { xs: 0 },
          mr: { xs: 0 },
        },
      }}
    >
      <DialogTitle>New Signature</DialogTitle>
      <DialogContent>
        <FormGroupRow>
          <Select
            value={type}
            onChange={onTypeChange}
            title="Signature Type"
            options={typeOptions}
          />
          <TextField label="ID" value={eveId} onChange={onEveIdChange} fullWidth />
        </FormGroupRow>
        {showWormholeForm ? <WormholeForm eveId={eveId} /> : <SigForm type={type} eveId={eveId} />}
      </DialogContent>
    </Dialog>
  );
};
