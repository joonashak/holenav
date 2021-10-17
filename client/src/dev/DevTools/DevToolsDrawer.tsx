import { Button, Drawer } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { yellow } from "@mui/material/colors";
import axios from "axios";
import { endpoints } from "../../config";
import MockUserSelect from "./MockUserSelect";

const useStyles = makeStyles({
  drawer: {
    backgroundColor: yellow[600],
    justifyContent: "flex-end",
    flexDirection: "row",
    padding: "1rem",
  },
  button: {
    marginLeft: "2rem",
  },
});

type DevToolsDrawerProps = {
  open: boolean;
  onClose: () => void;
};

export default ({ open, onClose }: DevToolsDrawerProps) => {
  const classes = useStyles();

  const reset = async () => {
    await axios.get(endpoints.dev.reset);
    window.location.reload();
  };
  const seed = async () => {
    await axios.get(endpoints.dev.seed);
    window.location.reload();
  };

  return (
    <Drawer anchor="bottom" open={open} onClose={onClose} classes={{ paper: classes.drawer }}>
      <Button variant="contained" color="primary" onClick={reset} className={classes.button}>
        Reset Database
      </Button>
      <Button variant="contained" color="primary" onClick={seed} className={classes.button}>
        Seed Database
      </Button>
      <MockUserSelect />
    </Drawer>
  );
};
