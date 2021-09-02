import { Drawer, makeStyles } from "@material-ui/core";
import { yellow } from "@material-ui/core/colors";
import { useState } from "react";
import DevToolsFab from "./DevToolsFab";

const useStyles = makeStyles({
  fab: {
    position: "absolute",
    right: "1rem",
    bottom: "1rem",
    color: "black",
    backgroundColor: yellow[600],
    "&:hover": {
      height: 56,
      backgroundColor: yellow[600],
    },
  },
  extendedIcon: {
    marginRight: "0.8rem",
  },
});

export default () => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const toggleOpen = () => setOpen((prev) => !prev);

  return (
    <>
      <DevToolsFab onClick={toggleOpen} />
      <Drawer anchor="bottom" open={open} onClose={toggleOpen}>
        asd
      </Drawer>
    </>
  );
};
