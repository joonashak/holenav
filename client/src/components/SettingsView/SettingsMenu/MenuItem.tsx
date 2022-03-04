import { ListItem, ListItemButton, ListItemIcon, ListItemText, SvgIcon } from "@mui/material";

type MenuItemProps = {
  text: string;
  Icon: typeof SvgIcon;
};

/**
 * Menu button with router navigation. Must be enclosed in MUI `List`.
 */
const MenuItem = ({ text, Icon }: MenuItemProps) => (
  <ListItem>
    <ListItemButton>
      <ListItemIcon>
        <Icon color="secondary" />
      </ListItemIcon>
      <ListItemText primary={text} />
    </ListItemButton>
  </ListItem>
);

export default MenuItem;
