import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Alert, AlertTitle, Box, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LoginButton from "../components/common/login-button/LoginButton";
import useMobile from "../hooks/useMobile";

const UnauthorizedView = () => {
  const navigate = useNavigate();
  const mobile = useMobile();

  return (
    <Container sx={{ pt: 4 }}>
      <Alert severity="error" action={!mobile && <LoginButton />}>
        <AlertTitle color="inherit">Unauthorized</AlertTitle>
        You must be logged in to open the requested view.
      </Alert>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
          pt: 4,
        }}
      >
        {mobile && <LoginButton />}
        <Button
          variant="contained"
          color="secondary"
          size="large"
          endIcon={<ArrowForwardIcon />}
          onClick={() => navigate("/")}
        >
          Go to Frontpage
        </Button>
      </Box>
    </Container>
  );
};

export default UnauthorizedView;
