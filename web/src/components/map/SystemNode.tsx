import { Box, Typography } from "@mui/material";
import { Handle, Position } from "@xyflow/react";

import Link from "../common/Link";
import { SystemNodeData } from "./data/map-flow-types";

type SystemNodeProps = {
  data: SystemNodeData;
};

const SystemNode = ({ data }: SystemNodeProps) => {
  const { systemName, name, unknown } = data;
  const to = !unknown && `/system/${systemName}`;

  return (
    <Box
      sx={{
        border: "1px solid #4f4f4f",
        borderRadius: 1,
        bgcolor: "#3c3c3c",
        width: "100px",
        textAlign: "center",
        pt: 0.3,
        pb: 0.3,
        pl: 0.7,
        pr: 0.7,
        // Not sure this is cool but it does make the edges sit flush when handles are hidden.
        m: "-3px",
      }}
    >
      <Handle type="target" position={Position.Top} style={{ opacity: 0 }} />

      {to ? (
        <Link to={to}>{name || systemName}</Link>
      ) : (
        <Typography>{name || systemName}</Typography>
      )}

      <Handle type="source" position={Position.Bottom} style={{ opacity: 0 }} />
    </Box>
  );
};

export default SystemNode;
