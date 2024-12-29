import { Box } from "@mui/material";
import { ReactFlowProvider } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import useConnectionData from "./data/useConnectionData";
import MapFlow from "./MapFlow";

const Map = () => {
  const asd = useConnectionData();
  console.log(JSON.stringify(asd, null, 2));

  if (asd.nodes.length === 0) {
    return null;
  }

  return (
    <Box sx={{ width: "100vw", height: "100vh" }} aria-label="Connection tree">
      <ReactFlowProvider>
        <MapFlow nodes={asd.nodes} edges={asd.edges} />
      </ReactFlowProvider>
    </Box>
  );
};

export default Map;
