import { useQuery } from "@apollo/client";
import EditIcon from "@mui/icons-material/Edit";
import { Box, IconButton, Paper, Typography } from "@mui/material";
import { useState as useReactState } from "react";
import ReactMarkdown from "react-markdown";
import { GetPublicAppDataDocument } from "../../../generated/graphql-operations";
import MotdEditor from "./MotdEditor";

const Motd = () => {
  const userIsAdmin = false;

  const [editOpen, setEditOpen] = useReactState(false);
  const toggleEditOpen = () => setEditOpen((prev) => !prev);

  const { data } = useQuery(GetPublicAppDataDocument);

  if (!data?.getPublicAppData.motd) {
    return null;
  }

  return (
    <Paper
      elevation={5}
      sx={{
        bgcolor: "primary.dark",
        color: "primary.contrastText",
        padding: 2,
        marginTop: 6,
        "&&>*": { marginBottom: 2 },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h3">Message of the Day</Typography>
        {userIsAdmin && (
          <IconButton
            aria-label="Edit MOTD"
            size="small"
            color="secondary"
            onClick={toggleEditOpen}
          >
            <EditIcon fontSize="inherit" />
          </IconButton>
        )}
      </Box>
      {!editOpen ? (
        <ReactMarkdown>{data?.getPublicAppData.motd || ""}</ReactMarkdown>
      ) : (
        <MotdEditor />
      )}
    </Paper>
  );
};

export default Motd;
