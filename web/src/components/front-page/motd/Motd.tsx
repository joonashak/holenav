import { useQuery } from "@apollo/client";
import { createState, useState } from "@hookstate/core";
import EditIcon from "@mui/icons-material/Edit";
import { Box, IconButton, Paper, Typography } from "@mui/material";
import { useState as useReactState } from "react";
import ReactMarkdown from "react-markdown";
import { GetPublicAppDataDocument } from "../../../generated/graphqlOperations";
import MotdEditor from "./MotdEditor";

export const motdState = createState("");

const Motd = () => {
  const userIsAdmin = false;

  const [editOpen, setEditOpen] = useReactState(false);
  const toggleEditOpen = () => setEditOpen((prev) => !prev);

  const state = useState(motdState);
  const { loading } = useQuery(GetPublicAppDataDocument, {
    onCompleted: (data) => {
      state.set(data.getPublicAppData.motd);
    },
  });

  if ((!state.value || loading) && !userIsAdmin) {
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
        <ReactMarkdown>{state.value}</ReactMarkdown>
      ) : (
        <MotdEditor />
      )}
    </Paper>
  );
};

export default Motd;
