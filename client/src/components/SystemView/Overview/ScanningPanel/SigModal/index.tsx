import { DialogContent, DialogTitle, SelectChangeEvent } from "@mui/material";
import { ChangeEvent, ReactElement, useState } from "react";
import Select from "../../../../controls/Select";
import SigForm from "./SigForm";
import WormholeForm from "./WormholeForm";
import FormGroupRow from "../../../../controls/FormGroupRow";
import Dialog from "../../../../common/Dialog";
import EveIdField from "./EveIdField";
import { Signature, SigTypes, Wormhole } from "../../../../../generated/graphqlOperations";

let typeOptions: Array<{ id: string; value: string; label: string | ReactElement }> = [
  { id: "sig-type-null", value: "", label: <em>Unknown</em> },
];

typeOptions = typeOptions.concat(
  Object.entries(SigTypes).map(([key, label]) => ({
    id: `sig-type-${label}`,
    value: label,
    label: key as string,
  }))
);

type SigModalProps = {
  open: boolean;
  onClose: () => void;
  wormhole?: Wormhole;
  signature?: Signature;
};

const SigModal = ({ open, onClose, wormhole, signature }: SigModalProps) => {
  const existingType = wormhole ? SigTypes.Wormhole : signature?.type;
  const defaultType = existingType || "";
  const [type, setType] = useState<SigTypes>(defaultType.toUpperCase() as SigTypes);

  const [eveId, setEveId] = useState<string>(wormhole?.eveId || signature?.eveId || "");

  const onTypeChange = ({ target }: SelectChangeEvent) => {
    setType(target.value as SigTypes);
  };

  const onEveIdChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setEveId(target.value);
  };

  const showWormholeForm = type === SigTypes.Wormhole.toUpperCase();
  const editing = !!wormhole || !!signature;
  const modalTitle = editing ? "Edit Signature" : "Add Signature";

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{modalTitle}</DialogTitle>
      <DialogContent>
        <FormGroupRow>
          <Select
            value={type}
            onChange={onTypeChange}
            title="Signature Type"
            options={typeOptions}
          />
          <EveIdField value={eveId} onChange={onEveIdChange} />
        </FormGroupRow>
        {showWormholeForm ? (
          <WormholeForm eveId={eveId} existing={wormhole} onClose={onClose} />
        ) : (
          <SigForm type={type} eveId={eveId} existing={signature} onClose={onClose} />
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
