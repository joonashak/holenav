import { Container } from "@mui/material";
import { ReactChild } from "react";

interface ViewportContainerProps {
  children: ReactChild | ReactChild[];
}

export default ({ children }: ViewportContainerProps) => (
  <Container
    maxWidth={false}
    disableGutters
    sx={{ backgroundColor: "primary.main", minHeight: "100vh" }}
  >
    {children}
  </Container>
);
