/* eslint-disable react/jsx-props-no-spreading */
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@material-ui/core";
import { Controller } from "react-hook-form";

type ControlledRadioGroupProps = {
  name: string;
  control: any;
  label: string;
  options: Options[];
};

type Options = {
  key: string;
  value: string;
  label: string;
};

export default ({ options, name, control, label }: ControlledRadioGroupProps) => {
  const Render = ({ field }: any) => (
    <FormControl component="fieldset">
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup aria-label={label} {...field}>
        {options.map(({ key, value, label: optLabel }) => (
          <FormControlLabel value={value} key={key} label={optLabel} control={<Radio />} />
        ))}
      </RadioGroup>
    </FormControl>
  );

  return <Controller name={name} control={control} render={Render} />;
};
