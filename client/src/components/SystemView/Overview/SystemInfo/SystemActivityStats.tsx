import { Box, Paper, Typography } from "@mui/material";
import useEsiSystemJumps from "../../../../services/esi/useEsiSystemJumps";
import useSystemData from "../../SystemData/useSystemData";

const SystemActivityStats = () => {
  const { eveId } = useSystemData();
  const { getJumpsBySystem } = useEsiSystemJumps();

  const stats = [
    { label: "Pod Kills", value: 2 },
    { label: "Jumps", value: getJumpsBySystem(eveId) },
    { label: "NPC Kills", value: 48 },
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
