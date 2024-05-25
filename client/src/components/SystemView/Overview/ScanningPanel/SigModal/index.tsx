import { DialogContent, DialogTitle, SelectChangeEvent } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { SigType, Signature } from "../../../../../generated/graphqlOperations";
import Dialog from "../../../../common/Dialog";
import FormGroupRow from "../../../../controls/FormGroupRow";
import Select from "../../../../controls/Select";
import useSigPasteListener from "../useSigPasteListener";
import EveIdField from "./EveIdField";
import SigForm from "./SigForm";
import WormholeForm from "./WormholeForm";

const typeOptions = [
  { id: "sig-type-opt-null", value: SigType.Unknown, label: <em>Unknown</em> },
  { id: "sig-type-opt-wh", value: SigType.Wormhole, label: "Wormhole" },
  { id: "sig-type-opt-data", value: SigType.Data, label: "Data" },
  { id: "sig-type-opt-relic", value: SigType.Relic, label: "Relic" },
  { id: "sig-type-opt-gas", value: SigType.Gas, label: "Gas" },
];

type SigModalProps = {
  open: boolean;
  onClose: () => void;
  signature?: Signature;
};

const SigModal = ({
  open,
  onClose: onCloseSuper,
  signature,
}: SigModalProps) => {
  const { disableSigPasteListener, enableSigPasteListener } =
    useSigPasteListener();
  const defaultType = signature?.type || SigType.Unknown;
  const [type, setType] = useState(defaultType);
  const defaultEveId = signature?.eveId || "";
  const [eveId, setEveId] = useState(defaultEveId);

  useEffect(() => {
    if (open) {
      disableSigPasteListener();
    } else {
      enableSigPasteListener();
    }
  }, [open]);

  const onClose = () => {
    if (!signature) {
      // Reset top-level form values when closed.
      setType(defaultType);
      setEveId(defaultEveId);
    }
    onCloseSuper();
  };

  const onTypeChange = ({ target }: SelectChangeEvent) => {
    setType(target.value as SigType);
  };

  const onEveIdChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setEveId(target.value);
  };

  const showWormholeForm = type === SigType.Wormhole.toUpperCase();
  const modalTitle = signature ? "Edit Signature" : "Add Signature";

  return (
    <Dialog open={open} onClose={onClose} data-cy="sig-modal">
      <DialogTitle>{modalTitle}</DialogTitle>
      <DialogContent>
        <FormGroupRow>
          <Select
            value={type}
            onChange={onTypeChange}
            title="Signature Type"
            options={typeOptions}
          />
          <EveIdField
            value={eveId}
            onChange={onEveIdChange}
            existingId={signature?.id || null}
          />
        </FormGroupRow>
        {showWormholeForm ? (
          <WormholeForm eveId={eveId} existing={signature} onClose={onClose} />
        ) : (
          <SigForm
            type={type}
            eveId={eveId}
            existing={signature}
            onClose={onClose}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

SigModal.defaultProps = {
  signature: null,
};

export default SigModal;
