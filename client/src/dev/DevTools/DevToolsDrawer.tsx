import { Button, Drawer, makeStyles } from "@material-ui/core";
import { yellow } from "@material-ui/core/colors";
import MockUserSelect from "./MockUserSelect";

const useStyles = makeStyles({
  drawer: {
    backgroundColor: yellow[600],
    justifyContent: "flex-end",
    flexDirection: "row",
    padding: "1rem",
  },
});

type DevToolsDrawerProps = {
  open: boolean;
  onClose: () => void;
};

export default ({ open, onClose }: DevToolsDrawerProps) => {
  const classes = useStyles();

  return (
    <Drawer anchor="bottom" open={open} onClose={onClose} classes={{ paper: classes.drawer }}>
      <Button variant="contained" color="primary">
        Reset Database
      </Button>
      <MockUserSelect />
    </Drawer>
  );
};
