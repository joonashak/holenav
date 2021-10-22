import { useMutation } from "@apollo/client";
import wormholes from "@eve-data/wormholes";
import { Button } from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import systems from "@eve-data/systems";
import ControlledRadioGroup from "../../../../controls/ControlledRadioGroup";
import ControlledSelect from "../../../../controls/Select/ControlledSelect";
import ControlledTextField from "../../../../controls/ControlledTextField";
import useNotification from "../../../../GlobalNotification/useNotification";
import { ADD_WORMHOLE } from "../../../SystemData/graphql";
import useSystemData, { Wormhole } from "../../../SystemData/useSystemData";
import FormGroupRow from "../../../../controls/FormGroupRow";
import RhfAutocomplete from "../../../../controls/RhfAutocomplete";

const lifeOptions = [
  { key: "lt-24-hrs", value: "lt-24-hrs", label: "Less than 24 hrs" },
  { key: "eol", value: "eol", label: "End of life" },
];

const massOptions = [
  { key: "mass-stable", value: "stable", label: "Stable" },
  { key: "mass-destab", value: "destab", label: "Destabilized" },
  { key: "mass-crit", value: "crit", label: "Critical" },
];

const whTypeOptions = [{ key: "wh-K162", value: "K162", label: "K162" }].concat(
  wormholes.map(({ type }) => ({ key: `wh-${type}`, value: type, label: type }))
);

type WormholeFormProps = {
  eveId: string;
  existing?: Wormhole;
};

const WormholeForm = ({ eveId, existing }: WormholeFormProps) => {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      name: existing?.name || "",
      life: "lt-24-hrs",
      mass: "stable",
      whType: existing?.type || "",
      whTypeReverse: "",
      destinationName: existing?.destinationName || null,
    },
  });
  const { addWormhole, updateWormhole, name: systemName } = useSystemData();
  const [addWhMutation] = useMutation(ADD_WORMHOLE);
  const { setNotification } = useNotification();

  const onSubmitNew = async (formData: FieldValues) => {
    const { name, destinationName } = formData;
    const mutationData = { name, eveId, systemName, destinationName };
    const res = await addWhMutation({ variables: mutationData });

    if (res.data && !res.errors) {
      addWormhole(res.data.addWormhole);
      setNotification("Wormhole added.", "success", true);
    }
  };

  const onSubmitEdit = async (formData: FieldValues) => {
    const { name, destinationName, whType, eol } = formData;
    const id = existing?.id || "";
    const mutationData = {
      name,
      id,
      destinationName,
      eveId,
      type: whType,
      eol: eol === "eol",
    };
    const res = await updateWormhole(mutationData);

    if (res.data && !res.errors) {
      setNotification("Wormhole updated.", "success", true);
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
