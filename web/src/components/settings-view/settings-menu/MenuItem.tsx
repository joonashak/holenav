import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SvgIcon,
} from "@mui/material";
import { useHistory } from "react-router-dom";

type MenuItemProps = {
  text: string;
  Icon: typeof SvgIcon;
  href?: string;
};

/** Menu button with router navigation. Must be enclosed in MUI `List`. */
const MenuItem = ({ text, Icon, href = "" }: MenuItemProps) => {
  const history = useHistory();

  const onClick = () => {
    if (!href) {
      return;
    }
    history.push(href);
  };

  return (
    <ListItem>
      <ListItemButton onClick={onClick}>
        <ListItemIcon>
          <Icon color="secondary" />
        </ListItemIcon>
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
  );
};

export default MenuItem;
