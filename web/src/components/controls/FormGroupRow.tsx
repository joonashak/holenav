import { FormGroup } from "@mui/material";
import { ReactNode } from "react";

type FormGroupRowProps = {
  children: ReactNode;
  fullWidth?: boolean;
};

const FormGroupRow = ({ children, fullWidth }: FormGroupRowProps) => {
  const dualColumnSx = {
    justifyContent: "space-between",
    "& > *": { maxWidth: 0.48 },
  };

  const fullWidthSx = {};

  const dynamicSx = fullWidth ? fullWidthSx : dualColumnSx;

  return (
    <FormGroup
      sx={{
        flexDirection: "row",
        mb: 4,
        ...dynamicSx,
      }}
    >
      {children}
    </FormGroup>
  );
};

FormGroupRow.defaultProps = {
  fullWidth: false,
};

export default FormGroupRow;
