import { Container, Drawer, List, ListItem } from "@mui/material";
import LogoutButton from "./LogoutButton";
import MapSelector from "./MapSelector";

type OverviewMenuProps = {
  open: boolean;
  toggle: () => void;
};

const OverviewMenu = ({ open, toggle }: OverviewMenuProps) => (
  <Drawer anchor="top" open={open} onClose={toggle}>
    <Container>
      <List>
        <ListItem>
          <MapSelector />
        </ListItem>
        <ListItem>
          <LogoutButton />
        </ListItem>
      </List>
    </Container>
  </Drawer>
);

export default OverviewMenu;
