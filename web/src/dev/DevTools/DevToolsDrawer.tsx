import { Button, Drawer } from "@mui/material";
import { yellow } from "@mui/material/colors";
import MockUserSelect from "./MockUserSelect";
import PollSettingSwitch from "./PollSettingSwitch";
import DevKeyForm from "./DevKeyForm";
import useLocalData from "../../components/LocalData/useLocalData";
import devToolsService from "../../services/devToolsService";

type DevToolsDrawerProps = {
  open: boolean;
  onClose: () => void;
};

const DevToolsDrawer = ({ open, onClose }: DevToolsDrawerProps) => {
  const { devKey } = useLocalData();

  const reset = async () => {
    await devToolsService.reset(devKey);
    window.location.reload();
  };

  const seed = async () => {
    await devToolsService.seed(devKey);
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
      <DevKeyForm />
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
