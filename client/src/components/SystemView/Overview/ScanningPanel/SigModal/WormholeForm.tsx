import { useMutation } from "@apollo/client";
import wormholes from "@eve-data/wormholes";
import { Button } from "@material-ui/core";
import { useEffect } from "react";
import { Control, useForm } from "react-hook-form";
import SigTypes from "../../../../../enum/SigTypes";
import ControlledRadioGroup from "../../../../controls/ControlledRadioGroup";
import ControlledSelect from "../../../../controls/ControlledSelect";
import ControlledTextField from "../../../../controls/ControlledTextField";
import useNotification from "../../../../GlobalNotification/useNotification";
import { ADD_SIGNATURE } from "../../../SystemData/graphql";
import useSystemData from "../../../SystemData/useSystemData";

const typeOptions = Object.entries(SigTypes).map(([key, label]) => ({
  key: `sig-type-${key}`,
  value: key,
  label,
}));

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
  control: Control<any, object>;
};

export default () => {
  const { handleSubmit, control, watch } = useForm({
    defaultValues: {
      type: typeOptions[2].value,
      life: "lt-24-hrs",
      mass: "stable",
      whType: "K162",
    },
  });
  const type = watch("type");
  const { addSignature, id } = useSystemData();
  const [addSigMutation, { data, loading, error }] = useMutation(ADD_SIGNATURE);
  const { setNotification } = useNotification();

  const onSubmit = (formData: any) => {
    console.log(formData);
    //addSigMutation({ variables: { ...formData, systemId: id } });
  };

  useEffect(() => {
    if (data && !loading && !error) {
      addSignature(data.addSignature);
      setNotification("Signature added.", "success", true);
    }
  }, [data, loading, error]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ControlledSelect name="type" control={control} label="Type" options={typeOptions} />
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
      <Button type="submit" variant="contained" color="primary">
        Add
      </Button>
    </form>
  );
};
