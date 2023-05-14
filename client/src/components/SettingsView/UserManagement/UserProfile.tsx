import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { User } from "../../../generated/graphqlOperations";

type UserProfileProps = {
  user: User;
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
          {user.main.alliance && ` / ${user.main.alliance.name} [${user.main.alliance.ticker}]`}
        </Typography>
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
