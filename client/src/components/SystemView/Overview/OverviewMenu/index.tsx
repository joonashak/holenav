import { Container, Drawer, List, ListItem } from "@material-ui/core";

type OverviewMenuProps = {
  open: boolean;
  toggle: () => void;
};

export default ({ open, toggle }: OverviewMenuProps) => {
  console.log("asd");

  return (
    <Drawer anchor="top" open={open} onClose={toggle}>
      <Container>
        <List>
          <ListItem>moi</ListItem>
        </List>
      </Container>
    </Drawer>
  );
};
