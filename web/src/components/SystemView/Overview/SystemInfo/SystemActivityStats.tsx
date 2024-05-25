import { Box, BoxProps, Typography } from "@mui/material";
import useEsiSystemJumps from "../../../../services/esi/useEsiSystemJumps";
import useEsiSystemKills from "../../../../services/esi/useEsiSystemKills";
import DataChip from "../../../common/DataChip";
import useSystemData from "../../SystemData/useSystemData";

const HBox = ({ children }: BoxProps) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-evenly",
      width: 1,
      my: "3px",
    }}
  >
    {children}
  </Box>
);

const SystemActivityStats = () => {
  const { eveId } = useSystemData();
  const { getJumpsBySystem } = useEsiSystemJumps();
  const { getKillsBySystem } = useEsiSystemKills();
  const { podKills, npcKills, shipKills } = getKillsBySystem(eveId);

  return (
    <>
      <Typography variant="h4" color="secondary.light">
        Activity (Last Hour)
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          my: 2,
        }}
      >
        <HBox>
          <DataChip
            label="Jumps"
            value={getJumpsBySystem(eveId)}
            labelProps={{ variant: "body2" }}
          />
          <DataChip
            label="Ship Kills"
            value={shipKills}
            labelProps={{ variant: "body2" }}
          />
        </HBox>
        <HBox>
          <DataChip
            label="NPC Kills"
            value={npcKills}
            labelProps={{ variant: "body2" }}
          />
          <DataChip
            label="Pod Kills"
            value={podKills}
            labelProps={{ variant: "body2" }}
          />
        </HBox>
      </Box>
    </>
  );
};

export default SystemActivityStats;
