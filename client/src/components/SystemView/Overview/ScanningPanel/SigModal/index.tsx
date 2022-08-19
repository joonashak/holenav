import { DialogContent, DialogTitle, SelectChangeEvent } from "@mui/material";
import { ChangeEvent, ReactElement, useState } from "react";
import Select from "../../../../controls/Select";
import SigForm from "./SigForm";
import WormholeForm from "./WormholeForm";
import FormGroupRow from "../../../../controls/FormGroupRow";
import Dialog from "../../../../common/Dialog";
import EveIdField from "./EveIdField";
import { Signature, SigType } from "../../../../../generated/graphqlOperations";

let typeOptions: Array<{ id: string; value: string; label: string | ReactElement }> = [
  { id: "sig-type-null", value: "", label: <em>Unknown</em> },
];

typeOptions = typeOptions.concat(
  Object.entries(SigType).map(([key, label]) => ({
    id: `sig-type-${label}`,
    value: label,
    label: key as string,
  }))
);

type SigModalProps = {
  open: boolean;
  onClose: () => void;
  signature?: Signature;
};

const SigModal = ({ open, onClose, signature }: SigModalProps) => {
  const defaultType = signature?.type || "";
  const [type, setType] = useState<SigType>(defaultType.toUpperCase() as SigType);

  const [eveId, setEveId] = useState<string>(signature?.eveId || "");

  const onTypeChange = ({ target }: SelectChangeEvent) => {
    setType(target.value as SigType);
  };

  const onEveIdChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setEveId(target.value);
  };

  const showWormholeForm = type === SigType.Wormhole.toUpperCase();
  const modalTitle = signature ? "Edit Signature" : "Add Signature";

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
          <EveIdField value={eveId} onChange={onEveIdChange} existingId={signature?.id || null} />
        </FormGroupRow>
        {showWormholeForm ? (
          <WormholeForm eveId={eveId} existing={signature} onClose={onClose} />
        ) : (
          <SigForm type={type} eveId={eveId} existing={signature} onClose={onClose} />
        )}
      </DialogContent>
    </Dialog>
  );
};

SigModal.defaultProps = {
  signature: null,
};

export default SigModal;
