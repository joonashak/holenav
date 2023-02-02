import wormholes from "@eve-data/wormholes";
import { Box, BoxProps, Typography } from "@mui/material";
import DataChip from "../../../common/DataChip";
import WormholeInfoTooltip from "../../../common/WormholeInfoTooltip";
import useSystemData from "../../SystemData/useSystemData";

const chipValueColors = {
  HIGH: "secondary.main",
  LOW: "warning.light",
  NULL: "error.light",
  TRIG: "error.main",
  THERA: "error.main",
};

type WormholeChipProps = {
  whType: string;
};

const WormholeChip = ({ whType }: WormholeChipProps) => {
  const wormhole = wormholes.find((wh) => wh.type === whType);
  if (!wormhole) {
    return null;
  }

  const { type, destination } = wormhole;
  const value = destination.type === "WH" ? `C${destination.whClass}` : destination.type;
  const valueColor =
    destination.type !== "WH" ? chipValueColors[destination.type] : "primary.contrastText";

  return (
    <WormholeInfoTooltip type={type}>
      <DataChip
        label={type}
        value={value}
        sx={{ width: "fit-contents" }}
        labelSx={{ mr: 3 }}
        valueSx={{ color: valueColor, ml: 3 }}
      />
    </WormholeInfoTooltip>
  );
};

const HBox = ({ children }: BoxProps) => (
  <Box sx={{ display: "flex", justifyContent: "space-evenly", width: 1, my: "3px" }}>
    {children}
  </Box>
);

const StaticConnections = () => {
  const { staticConnections } = useSystemData();

  return (
    <>
      <Typography variant="h4" color="secondary.light">
        Static Connections
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", my: 2 }}>
        <HBox>
          {staticConnections.map((whType) => (
            <WormholeChip whType={whType} key={`system-info-static-conn-${whType}`} />
          ))}
        </HBox>
      </Box>
    </>
  );
};

export default StaticConnections;
