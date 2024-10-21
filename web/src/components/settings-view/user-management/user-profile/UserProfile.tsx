import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { HolenavUser } from "../../../../generated/graphqlOperations";
import SystemRoleWidget from "./SystemRoleWidget";

type UserProfileProps = {
  user: HolenavUser;
};

const UserProfile = ({ user }: UserProfileProps) => (
  <>
    <Card sx={{}}>
      {user.main.portraitUrl && (
        <CardMedia
          component="img"
          height="140"
          image={user.main.portraitUrl}
          sx={{ width: "auto" }}
        />
      )}
      <CardContent>
        <Typography gutterBottom variant="h6">
          {user.main.name}
        </Typography>
        <Typography variant="body2">
          {`${user.main.corporation.name} [${user.main.corporation.ticker}]`}
          {user.main.alliance &&
            ` / ${user.main.alliance.name} [${user.main.alliance.ticker}]`}
        </Typography>
        <SystemRoleWidget user={user} />
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          Remove
        </Button>
      </CardActions>
    </Card>
  </>
);

export default UserProfile;
