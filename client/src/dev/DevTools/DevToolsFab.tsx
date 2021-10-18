import { Fab } from "@mui/material";
import { yellow } from "@mui/material/colors";
import BuildIcon from "@mui/icons-material/Build";
import { useState } from "react";

type DevToolsFabProps = {
  onClick: () => void;
};

export default ({ onClick }: DevToolsFabProps) => {
  const [extended, setExtended] = useState(false);

  const variant = extended ? "extended" : "circular";

  return (
    <Fab
      color="primary"
      variant={variant}
      onMouseOver={() => setExtended(true)}
      onMouseOut={() => setExtended(false)}
      onClick={onClick}
      data-cy="devtools-open"
      sx={{
        position: "absolute",
        right: "1rem",
        bottom: "1rem",
        color: "black",
        backgroundColor: yellow[600],
        "&:hover": {
          height: 56,
          backgroundColor: yellow[600],
        },
      }}
    >
      <BuildIcon sx={{ marginRight: extended ? "0.8rem" : 0 }} />
      {extended ? "Dev Tools" : null}
    </Fab>
  );
};
