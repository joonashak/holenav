import { Container as MuiContainer } from "@mui/material";
import { ReactChild } from "react";

type ContainerProps = {
  children: ReactChild | ReactChild[];
};

const Container = ({ children }: ContainerProps) => (
  <MuiContainer
    disableGutters
    sx={{
      display: "flex",
      backgroundColor: "primary.dark",
      width: "100vw",
      maxWidth: "100vw !important",
      height: "100vh",
      margin: 0,
      overflow: "scroll",
    }}
  >
    {children}
  </MuiContainer>
);

export default Container;
