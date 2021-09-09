import wormholes from "@eve-data/wormholes";
import { Control } from "react-hook-form";
import ControlledRadioGroup from "../../../../controls/ControlledRadioGroup";
import ControlledSelect from "../../../../controls/ControlledSelect";
import ControlledTextField from "../../../../controls/ControlledTextField";

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

export default ({ control }: WormholeFormProps) => {
  console.log("asd");

  return (
    <>
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
    </>
  );
};
