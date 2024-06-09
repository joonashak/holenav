import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Alert, Button, Container } from "@mui/material";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

type FatalErrorViewProps = {
  children: ReactNode;
};

const FatalErrorView = ({ children }: FatalErrorViewProps) => {
  const navigate = useNavigate();

  return (
    <Container sx={{ pt: 4 }}>
      <Alert severity="error">{children}</Alert>
      <Button
        variant="contained"
        color="secondary"
        size="large"
        endIcon={<ArrowForwardIcon />}
        onClick={() => navigate("/")}
        sx={{ mt: 2 }}
      >
        Go to Frontpage
      </Button>
    </Container>
  );
};

export default FatalErrorView;
