import { Container, Drawer, List, ListItem } from "@mui/material";
import LogoutButton from "./LogoutButton";
import MapSelector from "./MapSelector";
import SettingsButton from "./SettingsButton";

type OverviewMenuProps = {
  open: boolean;
  toggle: () => void;
};

const OverviewMenu = ({ open, toggle }: OverviewMenuProps) => (
  <Drawer anchor="top" open={true} onClose={toggle}>
    <Container>
      <List>
        <ListItem>
          <MapSelector />
        </ListItem>
        <ListItem>
          <SettingsButton />
          <LogoutButton />
        </ListItem>
      </List>
    </Container>
  </Drawer>
);

export default OverviewMenu;
