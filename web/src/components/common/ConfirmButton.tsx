import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import { IconButton, IconButtonProps } from "@mui/material";
import { MouseEventHandler, ReactElement, useState } from "react";

type ConfirmButtonProps = IconButtonProps & {
  icon: ReactElement;
  onConfirm: () => void;
};

const ConfirmButton = ({ onConfirm, ...props }: ConfirmButtonProps) => {
  const [confirming, setConfirming] = useState(false);

  const onClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    // Prevent closing menus etc. automatically before confirmation.
    event.stopPropagation();

    if (confirming) {
      onConfirm();
    }

    setConfirming(true);
    setTimeout(() => setConfirming(false), 2000);
  };

  return (
    <IconButton
      {...props}
      onClick={onClick}
      color={confirming ? "error" : undefined}
      aria-label={confirming ? "Confirm delete" : props["aria-label"]}
    >
      {confirming ? <CheckOutlinedIcon /> : props.icon}
    </IconButton>
  );
};

export default ConfirmButton;
