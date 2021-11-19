import wormholes from "@eve-data/wormholes";
import { Button } from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import systems from "@eve-data/systems";
import ControlledRadioGroup from "../../../../controls/ControlledRadioGroup";
import ControlledSelect from "../../../../controls/Select/ControlledSelect";
import ControlledTextField from "../../../../controls/ControlledTextField";
import useNotification from "../../../../GlobalNotification/useNotification";
import useSystemData from "../../../SystemData/useSystemData";
import { Wormhole } from "../../../SystemData/types";
import FormGroupRow from "../../../../controls/FormGroupRow";
import RhfAutocomplete from "../../../../controls/RhfAutocomplete";
import MassStatus from "../../../../../enum/MassStatus";

const lifeOptions = [
  { key: "lt-24-hrs", value: "lt-24-hrs", label: "Less than 24 hrs" },
  { key: "eol", value: "eol", label: "End of life" },
];

const massOptions = [
  { key: "mass-stable", value: MassStatus.STABLE, label: "Stable" },
  { key: "mass-destab", value: MassStatus.DESTAB, label: "Destabilized" },
  { key: "mass-crit", value: MassStatus.CRIT, label: "Critical" },
];

const whTypeOptions = [{ key: "wh-K162", value: "K162", label: "K162" }].concat(
  wormholes.map(({ type }) => ({ key: `wh-${type}`, value: type, label: type }))
);

type WormholeFormProps = {
  eveId: string;
  existing?: Wormhole;
  onClose: () => void;
};

const WormholeForm = ({ eveId, existing, onClose }: WormholeFormProps) => {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      name: existing?.name || "",
      life: existing?.eol ? "eol" : "lt-24-hrs",
      mass: existing?.massStatus || MassStatus.STABLE,
      whType: existing?.type || "",
      whTypeReverse: existing?.reverse?.type || "",
      destinationName: existing?.destinationName || null,
    },
  });
  const { addWormhole, updateWormhole, name: systemName } = useSystemData();
  const { showSuccessNotification } = useNotification();

  const onSubmitNew = async (formData: FieldValues) => {
    const { whType, whTypeReverse, life, mass, ...data } = formData;
    const mutationData = {
      eveId,
      systemName,
      type: whType,
      reverseType: whTypeReverse,
      eol: life === "eol",
      massStatus: mass,
      ...data,
    };
    const res = await addWormhole(mutationData);

    if (res.data && !res.errors) {
      showSuccessNotification("Wormhole added.");
      onClose();
    }
  };

  const onSubmitEdit = async (formData: FieldValues) => {
    const id = existing?.id || "";
    const { whType, whTypeReverse, life, mass, name, destinationName } = formData;
    const mutationData = {
      id,
      eveId,
      type: whType,
      reverseType: whTypeReverse,
      eol: life === "eol",
      massStatus: mass,
      name,
      destinationName,
    };
    const res = await updateWormhole(mutationData);

    if (res.data && !res.errors) {
      showSuccessNotification("Wormhole updated.");
      onClose();
    }
  };

  const onSubmit = existing ? onSubmitEdit : onSubmitNew;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormGroupRow>
        <ControlledSelect
          name="whType"
          control={control}
          label="Wormhole Type"
          options={whTypeOptions}
        />
        <ControlledTextField name="name" control={control} label="Name" />
      </FormGroupRow>
      <FormGroupRow>
        <ControlledRadioGroup
          name="life"
          control={control}
          label="Lifetime Status"
          options={lifeOptions}
        />
        <ControlledRadioGroup
          name="mass"
          control={control}
          label="Mass Status"
          options={massOptions}
        />
      </FormGroupRow>
      <FormGroupRow>
        <ControlledSelect
          name="whTypeReverse"
          control={control}
          label="Wormhole Type (Farside)"
          options={whTypeOptions}
        />
        <RhfAutocomplete
          name="destinationName"
          control={control}
          options={systems.map((system) => system.name)}
        />
      </FormGroupRow>
      <Button
        type="submit"
        variant="contained"
        color="secondary"
        data-cy="wh-form-submit"
        fullWidth
      >
        Save Wormhole
      </Button>
    </form>
  );
};

WormholeForm.defaultProps = {
  existing: null,
};

export default WormholeForm;
