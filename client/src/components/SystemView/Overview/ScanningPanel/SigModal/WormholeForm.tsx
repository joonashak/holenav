import { useMutation } from "@apollo/client";
import wormholes from "@eve-data/wormholes";
import { Button } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import ControlledRadioGroup from "../../../../controls/ControlledRadioGroup";
import ControlledSelect from "../../../../controls/Select/ControlledSelect";
import ControlledTextField from "../../../../controls/ControlledTextField";
import useNotification from "../../../../GlobalNotification/useNotification";
import { ADD_WORMHOLE } from "../../../SystemData/graphql";
import useSystemData from "../../../SystemData/useSystemData";

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

export default () => {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      life: "lt-24-hrs",
      mass: "stable",
      whType: "K162",
    },
  });
  const { addWormhole, name: systemName } = useSystemData();
  const [addWhMutation, { data, loading, error }] = useMutation(ADD_WORMHOLE);
  const { setNotification } = useNotification();

  const onSubmit = (formData: any) => {
    const { name } = formData;
    const mutationData = { name, systemName };
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
      <ControlledTextField name="eveId" control={control} label="ID" />
      <ControlledTextField name="name" control={control} label="Name" />
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
      <ControlledSelect
        name="whType"
        control={control}
        label="Wormhole Type"
        options={whTypeOptions}
      />
      <Button type="submit" variant="contained" color="primary" data-cy="wh-form-submit">
        Add
      </Button>
    </form>
  );
};
