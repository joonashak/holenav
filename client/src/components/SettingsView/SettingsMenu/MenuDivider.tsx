import { Divider, Typography } from "@mui/material";
import { ReactNode } from "react";

type MenuDividerProps = {
  children: ReactNode;
};

const MenuDivider = ({ children }: MenuDividerProps) => (
  <Divider
    sx={{
      color: "secondary.light",
      "&::before, &::after": {
        borderColor: "secondary.dark",
        zIndex: 0,
      },
    }}
  >
    <Typography variant="h3">{children}</Typography>
  </Divider>
);

export default MenuDivider;
