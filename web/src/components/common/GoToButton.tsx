import { Button, ButtonProps } from "@mui/material";
import { useNavigate } from "react-router-dom";

type GoToButtonProps = ButtonProps & {
  href: string;
};

/** MUI `Button` that uses `react-router-dom` to navigate to prop `href` value. */
const GoToButton = ({ href, children, ...props }: GoToButtonProps) => {
  const navigate = useNavigate();
  const onClick = () => navigate(href);

  return (
    <Button onClick={onClick} variant="outlined" color="secondary" {...props}>
      {children}
    </Button>
  );
};

export default GoToButton;
