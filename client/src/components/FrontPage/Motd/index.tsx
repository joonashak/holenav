import { useQuery } from "@apollo/client";
import { createState, useState } from "@hookstate/core";
import { Paper, Typography } from "@mui/material";
import { GetPublicAppDataDocument } from "../../../generated/graphqlOperations";
import useUserData from "../../UserData/useUserData";
import MotdEditor from "./MotdEditor";

export const motdState = createState("");

const Motd = () => {
  const { systemRole } = useUserData();
  const state = useState(motdState);
  const { loading } = useQuery(GetPublicAppDataDocument, {
    onCompleted: (data) => {
      state.set(data.getPublicAppData.motd);
    },
  });

  if (!state.value || loading) {
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
      <Typography variant="h3">Message of the Day</Typography>
      <Typography>{state.value}</Typography>
      <MotdEditor />
    </Paper>
  );
};

export default Motd;
