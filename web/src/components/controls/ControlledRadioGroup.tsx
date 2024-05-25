/* eslint-disable react/jsx-props-no-spreading */
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Control, Controller } from "react-hook-form";

type ControlledRadioGroupProps = {
  name: string;
  control: Control;
  label: string;
  options: Options[];
};

type Options = {
  key: string;
  value: string;
  label: string;
};

const ControlledRadioGroup = ({
  options,
  name,
  control,
  label,
}: ControlledRadioGroupProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Render = ({ field }: any) => (
    <FormControl component="fieldset" fullWidth>
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup aria-label={label} {...field}>
        {options.map(({ key, value, label: optLabel }) => (
          <FormControlLabel
            value={value}
            key={key}
            label={optLabel}
            control={<Radio data-cy={`checkbox-${name}-${value}`} />}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );

  return <Controller name={name} control={control} render={Render} />;
};

export default ControlledRadioGroup;
