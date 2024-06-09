import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Alert, AlertProps, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const FatalErrorView = (props: AlertProps) => {
  const navigate = useNavigate();

  return (
    <Container sx={{ pt: 4 }}>
      <Alert severity="error" {...props}></Alert>
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
