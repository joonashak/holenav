import {
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select as MuiSelect,
  Theme,
} from "@material-ui/core";
import { ChangeEvent } from "react";

type SelectProps = {
  options: Array<{ id: string; value: string; label: string }>;
  onChange: (event: ChangeEvent<{ value: unknown }>) => void;
  value: string;
  title: string;
};

const useStyles = makeStyles((theme: Theme) => ({
  label: {
    color: theme.palette.secondary.light,
    "&.Mui-focused": {
      color: theme.palette.secondary.main,
    },
  },
  select: {
    "&:before": {
      borderBottom: `1px solid ${theme.palette.secondary.main}`,
    },
    "&:not(.Mui-disabled):hover::before": {
      borderBottom: `1px solid ${theme.palette.secondary.light}`,
    },
    "&:after": {
      borderBottom: `1px solid ${theme.palette.secondary.light}`,
    },
  },
  outlined: {
    border: `1px solid ${theme.palette.secondary.dark}`,
  },
  arrowIcon: {
    color: theme.palette.secondary.main,
  },
}));

const Select = ({ options, onChange, value, title }: SelectProps) => {
  const classes = useStyles();

  return (
    <FormControl fullWidth>
      <InputLabel id={`select-${title}-label`} className={classes.label}>
        {title}
      </InputLabel>
      <MuiSelect
        value={value}
        labelId={`select-${title}-label`}
        onChange={onChange}
        className={classes.select}
        inputProps={{ classes: { icon: classes.arrowIcon, outlined: classes.outlined } }}
        variant="outlined"
      >
        {options.map((opt) => (
          <MenuItem key={`select-${title}-option-${opt.id}`} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
};

export default Select;
