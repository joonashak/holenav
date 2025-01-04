import { Box } from "@mui/material";
import { ReactFlowProvider } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import useSelectedMap from "../../hooks/useSelectedMap";
import MapFlow from "./MapFlow";

const Map = () => {
  const { selectedMap } = useSelectedMap();

  if (!selectedMap) {
    return null;
  }

  return (
    <Box sx={{ width: "100vw", height: "100vh" }} aria-label="Connection tree">
      <ReactFlowProvider>
        <MapFlow selectedMap={selectedMap} />
      </ReactFlowProvider>
    </Box>
  );
};

export default Map;
