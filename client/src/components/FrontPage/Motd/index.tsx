import { useQuery } from "@apollo/client";
import { createState, useState } from "@hookstate/core";
import { Box, IconButton, Paper, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useState as useReactState } from "react";
import ReactMarkdown from "react-markdown";
import { GetPublicAppDataDocument, SystemRoles } from "../../../generated/graphqlOperations";
import useUserData from "../../UserData/useUserData";
import MotdEditor from "./MotdEditor";

export const motdState = createState("");

const Motd = () => {
  const { systemRole } = useUserData();
  const userIsAdmin = systemRole === SystemRoles.Administrator;

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
      {!editOpen ? <ReactMarkdown>{state.value}</ReactMarkdown> : <MotdEditor />}
    </Paper>
  );
};

export default Motd;
