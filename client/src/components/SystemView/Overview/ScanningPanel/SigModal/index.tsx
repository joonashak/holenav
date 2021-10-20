import {
  Dialog,
  DialogContent,
  DialogTitle,
  FormGroup,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { ChangeEvent, useState } from "react";
import Select from "../../../../controls/Select";
import SigTypes from "../../../../../enum/SigTypes";
import SigForm from "./SigForm";
import WormholeForm from "./WormholeForm";

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
  const [type, setType] = useState<SigTypes>(SigTypes.DATA.toUpperCase() as SigTypes);
  const [eveId, setEveId] = useState<string>("");

  const onTypeChange = ({ target }: SelectChangeEvent) => {
    setType(target.value as SigTypes);
  };

  const onEveIdChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setEveId(target.value);
  };

  const showWormholeForm = type === SigTypes.WORMHOLE.toUpperCase();

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>New Signature</DialogTitle>
      <DialogContent>
        <FormGroup
          sx={{
            flexDirection: "row",
            justifyContent: "space-between",
            "& > *": { maxWidth: 0.45 },
          }}
        >
          <Select
            value={type}
            onChange={onTypeChange}
            title="Signature Type"
            options={typeOptions}
          />
          <TextField label="ID" value={eveId} onChange={onEveIdChange} />
        </FormGroup>
        {showWormholeForm ? <WormholeForm /> : <SigForm type={type} eveId={eveId} />}
      </DialogContent>
    </Dialog>
  );
};
