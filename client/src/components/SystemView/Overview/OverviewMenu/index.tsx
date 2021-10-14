import { Container, Drawer, List, ListItem, makeStyles, Theme } from "@material-ui/core";
import MapSelector from "./MapSelector";

type OverviewMenuProps = {
  open: boolean;
  toggle: () => void;
};

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    backgroundColor: theme.palette.primary.dark,
  },
}));

export default ({ open, toggle }: OverviewMenuProps) => {
  const { paper } = useStyles();

  return (
    <Drawer anchor="top" open={open} onClose={toggle} classes={{ paper }}>
      <Container>
        <List>
          <ListItem>
            <MapSelector />
          </ListItem>
        </List>
      </Container>
    </Drawer>
  );
};
