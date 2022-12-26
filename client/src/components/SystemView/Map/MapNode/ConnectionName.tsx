import { Typography } from "@mui/material";
import AppLink from "../../../common/AppLink";

type ConnectionNameProps = {
  showDestinationLink: boolean;
  destinationName: string;
  name: string;
};

const ConnectionName = ({ showDestinationLink, destinationName, name }: ConnectionNameProps) =>
  showDestinationLink ? (
    <AppLink to={`/system/${destinationName}`}>{name || destinationName}</AppLink>
  ) : (
    <Typography>{name}</Typography>
  );

export default ConnectionName;
