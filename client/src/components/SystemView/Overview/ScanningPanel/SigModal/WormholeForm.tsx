import wormholes from "@eve-data/wormholes";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import systems from "@eve-data/systems";
import ControlledRadioGroup from "../../../../controls/ControlledRadioGroup";
import ControlledSelect from "../../../../controls/Select/ControlledSelect";
import ControlledTextField from "../../../../controls/ControlledTextField";
import FormGroupRow from "../../../../controls/FormGroupRow";
import RhfAutocomplete from "../../../../controls/RhfAutocomplete";
import useWormholeForm from "./useWormholeForm";
import { MassStatus, Signature } from "../../../../../generated/graphqlOperations";

const lifeOptions = [
  { key: "lt-24-hrs", value: "lt-24-hrs", label: "Less than 24 hrs" },
  { key: "eol", value: "eol", label: "End of life" },
];

const massOptions = [
  { key: "mass-stable", value: MassStatus.Stable, label: "Stable" },
  { key: "mass-destab", value: MassStatus.Destab, label: "Destabilized" },
  { key: "mass-crit", value: MassStatus.Crit, label: "Critical" },
];

const whTypeOptions = [{ key: "wh-K162", value: "K162", label: "K162" }].concat(
  wormholes.map(({ type }) => ({ key: `wh-${type}`, value: type, label: type }))
);

export type WormholeFormProps = {
  existing?: Signature;
};

const WormholeForm = (props: WormholeFormProps) => {
  const { existing } = props;
  const { submitWormholeForm } = useWormholeForm(props);
  const { handleSubmit, control } = useForm({
    defaultValues: {
      name: existing?.name || "",
      life: existing?.connection?.eol ? "eol" : "lt-24-hrs",
      mass: existing?.connection?.massStatus || MassStatus.Stable,
      whType: existing?.wormholeType || "",
      whReverseType: existing?.connection?.reverseSignature.wormholeType || "",
      destinationName: existing?.connection?.reverseSignature.systemName || null,
    },
  });

  return (
    <form onSubmit={handleSubmit(submitWormholeForm)}>
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
          name="whReverseType"
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
