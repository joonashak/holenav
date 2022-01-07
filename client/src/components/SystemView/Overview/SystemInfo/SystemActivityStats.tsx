import { Box, Paper, Typography } from "@mui/material";
import useEsiSystemJumps from "../../../../services/esi/useEsiSystemJumps";
import useEsiSystemKills from "../../../../services/esi/useEsiSystemKills";
import useSystemData from "../../SystemData/useSystemData";

const SystemActivityStats = () => {
  const { eveId } = useSystemData();
  const { getJumpsBySystem } = useEsiSystemJumps();
  const { getKillsBySystem } = useEsiSystemKills();
  const { podKills, npcKills, shipKills } = getKillsBySystem(eveId);

  const stats = [
    { label: "Jumps", value: getJumpsBySystem(eveId) },
    { label: "Ship Kills", value: shipKills },
    { label: "NPC Kills", value: npcKills },
    { label: "Pod Kills", value: podKills },
  ];

  return (
    <Paper>
      <Typography variant="h6">Activity (Last Hour)</Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {stats.map(({ label, value }) => (
          <Box key={`activity-stats-${label}`} sx={{ display: "flex" }}>
            <Typography component="div" sx={{ minWidth: 100 }}>
              {label}
            </Typography>
            <Typography component="div" sx={{ minWidth: 50, marginRight: 5, textAlign: "right" }}>
              {value}
            </Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default SystemActivityStats;
