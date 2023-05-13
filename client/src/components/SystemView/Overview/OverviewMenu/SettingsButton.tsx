import { ButtonProps } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import GoToButton from "../../../common/GoToButton";

const SettingsButton = (props: ButtonProps) => (
  <GoToButton href="/settings" startIcon={<SettingsIcon />} {...props}>
    Settings
  </GoToButton>
);

export default SettingsButton;
