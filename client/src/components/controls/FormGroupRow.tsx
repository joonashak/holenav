import { FormGroup } from "@mui/material";
import { ReactNode } from "react";

type FormGroupRowProps = {
  children: ReactNode;
};

const FormGroupRow = ({ children }: FormGroupRowProps) => (
  <FormGroup
    sx={{
      flexDirection: "row",
      justifyContent: "space-between",
      mb: 4,
      "& > *": { maxWidth: 0.48 },
    }}
  >
    {children}
  </FormGroup>
);

export default FormGroupRow;
