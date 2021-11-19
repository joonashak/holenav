import { Button, ButtonProps } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useHistory } from "react-router-dom";

type GoToButtonProps = ButtonProps & {
  href: string;
};

/**
 * MUI `Button` that uses `react-router-dom` to navigate to prop `href` value.
 */
const GoToButton = ({ href, children, ...props }: GoToButtonProps) => {
  const history = useHistory();
  const onClick = () => history.push(href);

  return (
    <Button
      onClick={onClick}
      variant="outlined"
      color="secondary"
      endIcon={<ArrowForwardIcon />}
      {...props}
    >
      {children}
    </Button>
  );
};

export default GoToButton;
