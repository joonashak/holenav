import { useQuery } from "@apollo/client";
import { Paper, Typography } from "@mui/material";
import { GetPublicAppDataDocument } from "../../../generated/graphqlOperations";
import useUserData from "../../UserData/useUserData";
import MotdEditor from "./MotdEditor";

const Motd = () => {
  const { systemRole } = useUserData();
  const { data, loading } = useQuery(GetPublicAppDataDocument);

  if (!data || loading || !data.getPublicAppData.motd) {
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
      <Typography>{data.getPublicAppData.motd}</Typography>
      <MotdEditor />
    </Paper>
  );
};

export default Motd;
