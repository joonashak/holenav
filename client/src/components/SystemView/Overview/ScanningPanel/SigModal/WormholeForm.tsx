import { useMutation } from "@apollo/client";
import wormholes from "@eve-data/wormholes";
import { Autocomplete, Button, TextField } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import systems from "@eve-data/systems";
import ControlledRadioGroup from "../../../../controls/ControlledRadioGroup";
import ControlledSelect from "../../../../controls/Select/ControlledSelect";
import ControlledTextField from "../../../../controls/ControlledTextField";
import useNotification from "../../../../GlobalNotification/useNotification";
import { ADD_WORMHOLE } from "../../../SystemData/graphql";
import useSystemData from "../../../SystemData/useSystemData";
import FormGroupRow from "../../../../controls/FormGroupRow";

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
};

const WormholeForm = ({ eveId }: WormholeFormProps) => {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      life: "lt-24-hrs",
      mass: "stable",
      whType: "K162",
      whTypeReverse: "",
    },
  });
  const { addWormhole, name: systemName } = useSystemData();
  const [addWhMutation, { data, loading, error }] = useMutation(ADD_WORMHOLE);
  const { setNotification } = useNotification();

  const onSubmit = (formData: any) => {
    const { name } = formData;
    const mutationData = { name, eveId, systemName };
    addWhMutation({ variables: mutationData });
  };

  useEffect(() => {
    if (data && !loading && !error) {
      addWormhole(data.addWormhole);
      setNotification("Wormhole added.", "success", true);
    }
  }, [data, loading, error]);

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
        <Autocomplete
          options={systems.map((system) => system.name)}
          getOptionLabel={(option) => option.toString()}
          renderInput={(params) => <TextField {...params} label="Destination" />}
          fullWidth
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

export default WormholeForm;
