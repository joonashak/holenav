import { Container, Drawer, List, ListItem } from "@mui/material";
import MapSelector from "./MapSelector";

type OverviewMenuProps = {
  open: boolean;
  toggle: () => void;
};

export default ({ open, toggle }: OverviewMenuProps) => (
  <Drawer
    anchor="top"
    open={open}
    onClose={toggle}
    PaperProps={{ sx: { bgcolor: "primary.dark" } }}
  >
    <Container>
      <List>
        <ListItem>
          <MapSelector />
        </ListItem>
      </List>
    </Container>
  </Drawer>
);
