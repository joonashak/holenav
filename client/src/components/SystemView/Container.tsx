import { Container } from "@mui/material";
import { ReactChild } from "react";

type ContainerProps = {
  children: ReactChild | ReactChild[];
};

export default ({ children }: ContainerProps) => (
  <Container
    disableGutters
    sx={{
      display: "flex",
      backgroundColor: "primary.dark",
      width: "100%",
      maxWidth: "100vw",
      height: "100vh",
      margin: 0,
    }}
  >
    {children}
  </Container>
);
