import { Box, Typography } from "@mui/material";
import { Handle, Position } from "@xyflow/react";
import { SystemNodeData } from "./data/map-flow-types";

type SystemNodeProps = {
  data: SystemNodeData;
};

const SystemNode = ({ data }: SystemNodeProps) => {
  const { systemName, name } = data;
  return (
    <Box>
      <Handle type="target" position={Position.Top} />
      <Typography>{name || systemName}</Typography>
      <Handle type="source" position={Position.Bottom} />
    </Box>
  );
};

export default SystemNode;
