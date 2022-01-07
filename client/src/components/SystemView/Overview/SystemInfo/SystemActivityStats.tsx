import { Box, BoxProps, Chip, Typography } from "@mui/material";
import useEsiSystemJumps from "../../../../services/esi/useEsiSystemJumps";
import useEsiSystemKills from "../../../../services/esi/useEsiSystemKills";
import useSystemData from "../../SystemData/useSystemData";

type DataChipProps = {
  label: string;
  value: number;
};

const DataChip = ({ label, value }: DataChipProps) => (
  <Chip
    sx={{
      width: 0.45,
      "& > span": { width: 1 },
      bgcolor: "primary",
      px: 2,
      py: 3,
    }}
    label={
      <Box
        sx={{
          display: "flex",
          width: 1,
          justifyContent: "space-between",
        }}
      >
        <Typography variant="body2">{label}</Typography>
        <Typography sx={{ fontWeight: 600 }}>{value}</Typography>
      </Box>
    }
  />
);

const HBox = ({ children }: BoxProps) => (
  <Box sx={{ display: "flex", justifyContent: "space-evenly", width: 1, my: "3px" }}>
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
      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", my: 2 }}>
        <HBox>
          <DataChip label="Jumps" value={getJumpsBySystem(eveId)} />
          <DataChip label="Ship Kills" value={shipKills} />
        </HBox>
        <HBox>
          <DataChip label="NPC Kills" value={npcKills} />
          <DataChip label="Pod Kills" value={podKills} />
        </HBox>
      </Box>
    </>
  );
};

export default SystemActivityStats;
