import { Fab } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { yellow } from "@mui/material/colors";
import BuildIcon from "@mui/icons-material/Build";
import { useState } from "react";

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

type DevToolsFabProps = {
  onClick: () => void;
};

export default ({ onClick }: DevToolsFabProps) => {
  const [extended, setExtended] = useState(false);
  const classes = useStyles();

  const variant = extended ? "extended" : "circular";
  const iconClassName = extended ? classes.extendedIcon : undefined;

  return (
    <Fab
      color="primary"
      className={classes.fab}
      variant={variant}
      onMouseOver={() => setExtended(true)}
      onMouseOut={() => setExtended(false)}
      onClick={onClick}
      data-cy="devtools-open"
    >
      <BuildIcon className={iconClassName} />
      {extended ? "Dev Tools" : null}
    </Fab>
  );
};
