import { Chip, Typography } from "@material-ui/core";
import useSystemData from "../../SystemData/useSystemData";

export default () => {
  const { signatures } = useSystemData();

  return (
    <>
      <Typography>Signatures</Typography>
      {signatures && <Chip label={signatures.length} />}
    </>
  );
};
