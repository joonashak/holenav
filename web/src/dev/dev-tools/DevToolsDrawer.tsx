import { Button, Drawer } from "@mui/material";
import { yellow } from "@mui/material/colors";
import MockUserSelect from "./MockUserSelect";
import PollSettingSwitch from "./PollSettingSwitch";

type DevToolsDrawerProps = {
  open: boolean;
  onClose: () => void;
};

const DevToolsDrawer = ({ open, onClose }: DevToolsDrawerProps) => {
  const reset = async () => {
    window.location.reload();
  };

  const seed = async () => {
    window.location.reload();
  };

  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          backgroundColor: yellow[600],
          justifyContent: "flex-end",
          flexDirection: "row",
          padding: "1rem",
          "&& > *": {
            marginLeft: "2rem",
          },
        },
      }}
    >
      <PollSettingSwitch />
      <Button variant="contained" color="primary" onClick={reset}>
        Reset Database
      </Button>
      <Button variant="contained" color="primary" onClick={seed}>
        Reset &amp; Seed Database
      </Button>
      <MockUserSelect />
    </Drawer>
  );
};

export default DevToolsDrawer;
