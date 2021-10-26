import { Dialog, DialogContent, DialogTitle, SelectChangeEvent, TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";
import Select from "../../../../controls/Select";
import SigTypes from "../../../../../enum/SigTypes";
import SigForm from "./SigForm";
import WormholeForm from "./WormholeForm";
import FormGroupRow from "../../../../controls/FormGroupRow";
import { Signature, Wormhole } from "../../../SystemData/useSystemData";

const typeOptions = Object.entries(SigTypes).map(([key, label]) => ({
  id: `sig-type-${key}`,
  value: key,
  label,
}));

type SigModalProps = {
  open: boolean;
  onClose: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void;
  wormhole?: Wormhole;
  signature?: Signature;
};

const SigModal = ({ open, onClose, wormhole, signature }: SigModalProps) => {
  const defaultType = wormhole ? SigTypes.WORMHOLE : SigTypes.DATA;
  const [type, setType] = useState<SigTypes>(defaultType.toUpperCase() as SigTypes);
  const [eveId, setEveId] = useState<string>(wormhole?.eveId || "");

  const onTypeChange = ({ target }: SelectChangeEvent) => {
    setType(target.value as SigTypes);
  };

  const onEveIdChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setEveId(target.value);
  };

  const showWormholeForm = type === SigTypes.WORMHOLE.toUpperCase();
  const editing = !!wormhole || !!signature;
  const modalTitle = editing ? "Edit Signature" : "Add Signature";

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
      <DialogTitle>{modalTitle}</DialogTitle>
      <DialogContent>
        <FormGroupRow>
          <Select
            value={type}
            onChange={onTypeChange}
            title="Signature Type"
            options={typeOptions}
          />
          <TextField
            label="ID"
            value={eveId}
            onChange={onEveIdChange}
            data-cy="textfield-eveId"
            fullWidth
          />
        </FormGroupRow>
        {showWormholeForm ? (
          <WormholeForm eveId={eveId} existing={wormhole} />
        ) : (
          <SigForm type={type} eveId={eveId} />
        )}
      </DialogContent>
    </Dialog>
  );
};

SigModal.defaultProps = {
  wormhole: null,
  signature: null,
};

export default SigModal;
