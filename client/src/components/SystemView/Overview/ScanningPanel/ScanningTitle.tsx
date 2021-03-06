import { Box, Chip, Typography } from "@mui/material";
import useSignatures from "../../SystemData/useSignatures";

export default () => {
  const { allSigs } = useSignatures();

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
      {allSigs && (
        <Chip
          label={allSigs.length}
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
