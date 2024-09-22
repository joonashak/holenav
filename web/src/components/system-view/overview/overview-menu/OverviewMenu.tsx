import { Container, Drawer, List, ListItem } from "@mui/material";
import LogoutButton from "./LogoutButton";
import SettingsButton from "./SettingsButton";

type OverviewMenuProps = {
  open: boolean;
  toggle: () => void;
};

const OverviewMenu = ({ open, toggle }: OverviewMenuProps) => (
  <Drawer anchor="top" open={open} onClose={toggle}>
    <Container>
      <List>
        <ListItem
          sx={{ justifyContent: { xs: "space-between", md: "center" } }}
        >
          <SettingsButton sx={{ mr: { xs: 0, md: 4 } }} />
          <LogoutButton />
        </ListItem>
      </List>
    </Container>
  </Drawer>
);

export default OverviewMenu;
