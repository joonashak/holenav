import {
  Dialog,
  DialogContent,
  DialogTitle,
  FormGroup,
  Paper,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { useState } from "react";
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

  const onTypeChange = ({ target }: SelectChangeEvent) => {
    setType(target.value as SigTypes);
  };

  const showWormholeForm = type === SigTypes.WORMHOLE.toUpperCase();

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>New Signature</DialogTitle>
      <DialogContent>
        <FormGroup>
          <Select
            value={type}
            onChange={onTypeChange}
            title="Signature Type"
            options={typeOptions}
          />
        </FormGroup>
        {showWormholeForm ? <WormholeForm /> : <SigForm type={type} />}
      </DialogContent>
    </Dialog>
  );
};
