import { Box } from "@mui/material";
import { ReactFlowProvider } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import MapFlow from "./MapFlow";

const Map = () => {
  return (
    <Box sx={{ width: "100vw", height: "100vh" }} aria-label="Connection tree">
      <ReactFlowProvider>
        <MapFlow />
      </ReactFlowProvider>
    </Box>
  );
};

export default Map;
