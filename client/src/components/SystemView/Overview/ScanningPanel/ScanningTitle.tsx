import { Box, Chip, Typography } from "@mui/material";
import useSystemData from "../../SystemData/useSystemData";

export default () => {
  const { signatures, wormholes } = useSystemData();
  const nSigs = signatures.concat(wormholes).length;

  return (
    <Box
      sx={{
        width: 1,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography variant="h3">Signatures</Typography>
      {signatures && (
        <Chip
          label={nSigs}
          sx={{
            bgcolor: "primary.dark",
            color: "primary.contrastText",
            fontWeight: "bold",
            fontSize: "1.05rem",
            mr: 1,
          }}
        />
      )}
    </Box>
  );
};
